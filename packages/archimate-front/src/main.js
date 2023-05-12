import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
	faArrowRotateRight,
	faBuilding,
	faCheck,
	faDownload,
	faEnvelope,
	faEuroSign,
	faFileExport,
	faFileInvoiceDollar,
	faFloppyDisk,
	faLock,
	faLockOpen,
	faPencil,
	faPersonChalkboard,
	faPlus,
	faTrash,
	faUpload,
	faUserSecret,
	faWarning,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faLock, faLockOpen, faEuroSign, faWarning, faFileInvoiceDollar, faPersonChalkboard, faBuilding, faPencil, faArrowRotateRight, faFloppyDisk, faFileExport, faTrash, faCheck, faEnvelope, faPlus, faDownload, faUpload)
let app = createApp(App);
// app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus);
app.mount('#app')
