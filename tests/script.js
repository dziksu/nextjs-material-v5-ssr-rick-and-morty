import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  const res = http.get('http://localhost:3000');
  check(res, { 'status was 200': (r) => r.status == 200 });
}
