import Odoo from './odoojs/odoojs/odoo';
import zog_igame from './odoojs/odoo.addons.zog_igame';


const host = 'http://192.168.1.8:8069'
const db   ='TT'

const {crm, project, product,analytic,account} = Odoo.addons
const modules = {zog_igame}

const odoo = new Odoo({ host, db, modules })
export default odoo