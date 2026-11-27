import sessions from './sessions.json' with { type: 'json' };

export { sessions };
export const inquiryPath = '/api/classroom/inquiries';

export function sessionDates(session) {
  return session.start === session.end ? session.start : session.start + ' 至 ' + session.end;
}
