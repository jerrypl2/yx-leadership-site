// A call owns its microphone, peer, signalling request and playback element.
export function startVoice(url, audio, report, ended, devices = navigator.mediaDevices) {
  const controller = new AbortController();
  const peer = new RTCPeerConnection();
  let mic, channel, closing = false, finished = false, closeTimer, callTimer;
  const connectTimer = setTimeout(() => finish('连接超时，请重试。'), 45000);
  function finish(message) {
    if (finished) return;
    finished = true;
    controller.abort();
    clearTimeout(connectTimer); clearTimeout(closeTimer); clearTimeout(callTimer);
    mic?.getTracks().forEach(t => t.stop());
    channel?.close(); peer.close(); audio.pause(); audio.srcObject = null;
    ended(message);
  }
  function stop() {
    if (finished || closing) return;
    closing = true;
    mic?.getTracks().forEach(t => { t.enabled = false; });
    if (channel?.readyState !== 'open') { finish('语音通话已结束'); return; }
    closeTimer = setTimeout(() => finish('语音通话已结束'), 4000);
    try { channel.send(JSON.stringify({type:'session.close'})); }
    catch { finish('语音通话已结束'); }
  }
  async function connect() {
    try {
      const stream = await devices.getUserMedia({audio:true});
      if (finished) { stream.getTracks().forEach(t => t.stop()); return; }
      mic = stream;
      stream.getAudioTracks().forEach(track => peer.addTrack(track,stream));
      peer.ontrack = event => {
        if (finished) return;
        audio.srcObject = event.streams[0] || new MediaStream([event.track]);
        audio.play().catch(() => { if (!finished) report('请点播放键收听悦悦。'); });
      };
      peer.onconnectionstatechange = () => {
        if (peer.connectionState === 'failed') finish('语音连接已中断。');
      };
      channel = peer.createDataChannel('oai-events');
      channel.onclose = () => finish(closing ? '语音通话已结束' : '语音连接已关闭。');
      channel.onmessage = event => {
        let data;
        try { data = JSON.parse(event.data); } catch { return; }
        if (finished) return;
        if (data.type === 'session.started') {
          clearTimeout(connectTimer);
          report('语音已连通，可以直接和悦悦说话。');
          callTimer = setTimeout(stop, 180000);
        }
        if (data.type === 'session.closed') finish('语音通话已结束');
        if (data.type === 'error') finish('语音暂时不可用，请稍后重试。');
      };
      await peer.setLocalDescription(await peer.createOffer());
      if (peer.iceGatheringState !== 'complete') {
        await new Promise((resolve,reject) => {
          const timeout = setTimeout(() => settle(new Error('ICE timeout')),10000);
          function check() { if (peer.iceGatheringState === 'complete') settle(); }
          function cancel() { settle(new Error('cancel')); }
          function settle(error) {
            clearTimeout(timeout);
            peer.removeEventListener('icegatheringstatechange',check);
            controller.signal.removeEventListener('abort',cancel);
            if (error) reject(error); else resolve();
          }
          peer.addEventListener('icegatheringstatechange',check);
          controller.signal.addEventListener('abort',cancel,{once:true});
          if (controller.signal.aborted) cancel(); else check();
        });
      }
      const r = await fetch(url,{method:'POST', credentials:'omit', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({sdp:peer.localDescription.sdp}),signal:controller.signal});
      if (!r.ok) throw new Error(r.status === 429 ? 'limit' : 'provider');
      const {sdp} = await r.json();
      await peer.setRemoteDescription({type:'answer',sdp});
    } catch (err) {
      const note = err.name === 'NotAllowedError' ? '麦克风权限未开启，可继续文字对话。'
        : err.message === 'limit' ? '语音服务繁忙，请稍后再试。' : '语音未能连通，可继续文字对话。';
      finish(note);
    }
  }
  void connect();
  return {stop, dispose:() => {stop();finish('语音通话已结束');}};
}
