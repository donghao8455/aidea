import {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

/**
 * 旧 URL 重定向 shim
 *
 * /concept?id=<id> → /concepts/<id>
 * 在 nginx 层（301）和插件层都已做，这个是客户端兜底
 */
export default function ConceptRedirect(): null {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || '';
    // 白名单校验：只允许 [a-z0-9-] 字符
    if (id && /^[a-z0-9-]+$/.test(id)) {
      window.location.replace(`/concepts/${id}`);
    } else {
      // 无效 ID 跳回首页
      window.location.replace('/');
    }
  }, [location.search]);

  // 渲染阶段不显示任何内容（即将跳转）
  return null;
}
