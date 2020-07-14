export class Client {
    public customerID: string;
    public companyName: string;
    public contactName: string;
    public contactTitle: string;
    public address: string;
    public city: string;
    public region: string;
    public postalCode: string;
    public country: string;
    public phone: string;
    public fax: string;

    constructor() {
        this.emptyClient();
    }

    emptyClient() {
        this.customerID = '';
        this.companyName = '';
        this.contactName = '';
        this.contactTitle = '';
        this.address = '';
        this.city = '';
        this.region = '';
        this.postalCode = '';
        this.country = '';
        this.phone = '';
        this.fax = '';
    }
}
