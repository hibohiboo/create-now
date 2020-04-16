import React from 'react'
import Link from '../../atoms/mui/Link'

const Footer: React.FC = () => {
  return (
    <footer>
      <a
        href="https://twitter.com/hibohiboo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Presented by hibohiboo
      </a>
      <Link href="/infos/agreement"> 利用規約 </Link>
      <Link href="/infos/privacy-policy"> プライバシーポリシー </Link>
    </footer>
  )
}
export default Footer
