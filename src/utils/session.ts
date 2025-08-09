/**
 * 세션 ID 쿠키 유틸리티
 * - 목적: 비로그인 환경에서 사용자 식별(ID) 용도
 * - 형식: 소문자 알파벳+숫자 16자리
 * - 저장: 쿠키(session_id), Lax, 1년 보존, HTTPS 환경에선 Secure
 */

const COOKIE_NAME = 'session_id';

function randomSessionId(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[array[i] % chars.length];
  }
  return id;
}

export function getSessionIdFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const c of cookies) {
    const [k, v] = c.split('=');
    if (k === COOKIE_NAME) return decodeURIComponent(v);
  }
  return null;
}

export function setSessionCookie(id: string) {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365; // 1년
  const isSecure = typeof location !== 'undefined' && location.protocol === 'https:';
  const attrs = [
    `${COOKIE_NAME}=${encodeURIComponent(id)}`,
    'Path=/',
    `Max-Age=${maxAge}`,
    'SameSite=Lax',
  ];
  if (isSecure) attrs.push('Secure');
  document.cookie = attrs.join('; ');
}

export function getOrCreateSessionId(): string {
  let id = getSessionIdFromCookie();
  if (id) return id;
  id = randomSessionId(16);
  setSessionCookie(id);
  return id;
}

export function ensureSessionCookie(): string {
  return getOrCreateSessionId();
}
