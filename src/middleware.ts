import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * next-intl Middleware 配置
 * * 這個檔案必須放在專案的根目錄 (與 app/ 或 src/ 同層)
 */
export default createMiddleware({
  // 3. 語系前綴策略
  // 'as-needed': 預設語系 (zh) 會隱藏前綴，網址保持 /
  // 其他語系則會顯示前綴，如 /en, /jp
  localePrefix: 'as-needed',
  ...routing,
});

/**
 * 匹配器 (Matcher)
 * * 告訴 Next.js 哪些路徑需要經過這個 Middleware。
 * 我們通常會排除 API 請求、靜態檔案 (_next) 和圖檔 (.*\\..*)。
 */
export const config = {
  // 匹配所有路徑，除了以下排除項：
  // - api (API 路由)
  // - _next (Next.js 內部檔案)
  // - _vercel (Vercel 部署檔案)
  // - 含有副檔名的靜態資源 (如 favicon.ico, images)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
