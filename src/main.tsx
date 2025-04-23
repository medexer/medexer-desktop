import './output.css';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/nprogress/styles.css';
import ReactDOM from 'react-dom/client';
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
// 	console.log(message);
// });
