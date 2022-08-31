export interface Paging {
    datas: any[];
    pagging: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        total: number;
    };
    sort:{
        sorted: boolean;
        unsorted: boolean;
    }
}