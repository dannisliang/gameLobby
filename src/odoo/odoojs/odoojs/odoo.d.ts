import { async, longStackSupport, timeout } from "q";
import Login from "@/components/Login";
import { userInfo, type } from "os";
import { callbackify } from "util";
import { lookup } from "dns";
import Search from "antd/lib/transfer/search";



interface modules {

}
interface obj<T> {
    [index: string]: T
}
interface models extends obj<Array<string>> { }
interface Options {
    host: string,
    db: string,
    modules?: modules,
    models?: models,
}
interface errCallback {

}
interface loginParams {
    db?: string,
    login: string,
    password: string
}
type dataSource = Array<any>
interface error {
    message?: string
}
interface callParams {
    model: models,
    methods: string,
    args: Array<any>,
    kwargs?: {}
}
interface data {
    code: number,
    result?: dataSource
    error?: error
}
type fieldsData = string | object
interface fields extends obj<fieldsData> { }
type domain = Array<Array<any>>
type kwargs = {}
type ids = Array<number>
type id = number
export default class Odoo {
    constructor(options: Options);
    _rpc: rpc
    _models: models
    _env: Array<cls>
    _modules: modules
    /**
     * 循环modules
     * @param module_name 
     * @param module 
     */
    _fn_one_module(module_name: string, module: modules): void
    /**
     * 循环models
     * @param model_name 
     * @param model 
     */
    _fn_one_model(model_name: string, model: models): void
    /**
     * 测试方法
     */
    mock(): void
    /**
     * 错误捕获
     */
    setErrorCallback(callback: errCallback): void
    /** */
    init(): void
    login(params: loginParams): number | null
    logout(): data
    verify(): boolean;
    env(model: string): clsStatic
    user(fields: fields): cls

    /**
     * 返回某个用户模型
     * @param session_id 
     */

}
interface OdooStatic {
    _session: {}
    load(session_id: string): Odoo
}
export class cls {
    constructor(ids: Array<number> | number)
    ids: Array<number>
    id?: number
    call(params: callParams): data
    toggle_active(): data
    list(): Array<cls>
    look(fields: fields): dataSource
    byid(id: id): cls
    view(id: id): cls
    setAttr(attr: string, value: any): void
    attr(attr: string): any | cls

}
export interface clsIns extends cls { }


export interface clsStatic {
    _name: string
    _rpc: rpc
    _env: Array<clsStatic>
    _records: dataSource
    _fields: fields
    _fields_raw: Array<string>
    init(): clsStatic
    env(relation: string): clsStatic
    call(method: string, args: Array<any>, kwargs?: {}): data | null
    get_fields2(fields: fields): Array<string | Array<any>>
    set_multi(data: dataSource, fields?: fields): ids
    _set_one(data: dataSource, fields?: fields): id
    _get_one(ids: ids, fields: fields): dataSource
    _get_multi(id: id, fields: fields): dataSource
    fields_get(allfields: Array<string | Array<any>>, attributes: Array<string>): Array<any>
    search(domain: domain, fields?: fields, kwargs?: {}): cls
    browse(ids?: ids, fields?: fields, lazy?: number): cls
    search_read(domain: domain, fields: fields, kwargs?: kwargs): dataSource,
    search_count(domain: domain): number
    read(ids: ids, fields: fields): dataSource
    creat(vals: {}): cls | data
    write(id: id, vals: {}): data | cls
    unlink(id: id): data | cls
    view(id: id): cls
}


interface rpcOptions extends Options {
    sid?: string,
    uid?: number,
    timeout?: number,
    callbackerror?: () => void

}
export class rpc {
    constructor(options: rpcOptions)
    host: string
    db: string
    sid: string
    uid: number
    timeout: number
    callbackerror: () => void
    _callbackerror(url: string, params: callParams, error: error): void
    josn(url: string, params: callParams, timeout: number): data
    login(params: loginParams): data
    logout(): data
    call(params: callParams): data
}
export interface rpcIns extends rpc { }

