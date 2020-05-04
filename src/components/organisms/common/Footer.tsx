import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer style={{ fontSize: '0.7rem' }}>
      <a
        href="https://twitter.com/hibohiboo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Presented by hibohiboo
      </a>
      <a href="/infos/agreement"> 利用規約 </a>
      <a href="/infos/privacy-policy"> プライバシーポリシー </a>
    </footer>
  )
}
export default Footer
