import ReactDOM from 'react-dom'
import { Logo } from '@pmndrs/branding'
import './styles.css'
import App from './App'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '16px' }}>vaibhav —</div>
      <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '16px' }}> <br />\ | /</div>
    </div>
  )
}

ReactDOM.render(
  <>
    <App />
    <Overlay />
    <Logo style={{ position: 'fixed', bottom: 40, left: 40, width: 30 }} />
  </>,
  document.getElementById('root')
)
