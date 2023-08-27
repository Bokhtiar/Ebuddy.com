export class Status {
    static INITIAL = 'INITIAL';
    static EMPTY = 'EMPTY';
    static RESET = 'RESET';
    static UPDATE = 'UPDATE';
    static CACHE = 'CACHE';
    static ERROR = 'ERROR';
    static SUCCESS = 'SUCCESS';
}

export class AclStatus {
    static ALLOW = 'ALLOW';
    static DENY = 'DENY';
}

export class FetchStatus {
    static INITIAL = 'INITIAL';
    static START = 'START';
    static LOADING = 'LOADING';
    static SUCCESS = 'SUCCESS';
    static FAILED = 'FAILED';
    static NO_NETWORK = 'NO_NETWORK';
    static RETRY = 'RETRY';
    static ACCESS_DENY = 'ACCESS_DENY';
}