// The worker is created only after the visitor explicitly enables on-device AI.
// Terminating it cancels downloads or inference without blocking the site.
let engine;
self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'load') {
      const runtime = 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.89/lib/index.js';
      const { CreateMLCEngine } = await import(/* @vite-ignore */ runtime);
      engine = await CreateMLCEngine('Qwen2.5-0.5B-Instruct-q4f16_1-MLC', {
        initProgressCallback: ({ text, progress }) => self.postMessage({
          type: 'progress', progress: /fetch|load|cache/i.test(text) ? progress : 0,
        }),
      }, { context_window_size: 2048 });
      self.postMessage({ type: 'ready' });
    } else if (data.type === 'answer' && engine) {
      const completion = await engine.chat.completions.create({
        messages: data.messages, temperature: 0.2, max_tokens: 240,
      });
      const text = completion.choices[0]?.message?.content?.trim();
      if (!text) throw Error('Empty answer');
      self.postMessage({ type: 'answer', text });
    }
  } catch {
    self.postMessage({ type: 'error' });
  }
};
