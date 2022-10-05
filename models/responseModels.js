export{ ResponseModel,ErrorModel}

 class ResponseModel{
    constructor({responseCode,isSuccess=false,data,errorCode=null,errorMessage=null,message=null}){
        this.responseCode = responseCode;
        this.isSuccess = isSuccess;
        this.data = data;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.message = message;
    }
}

 class ErrorModel{
    constructor({responseCode,isSuccess=false,errorCode=null,errorMessage=null}){
        this.responseCode = responseCode;
        this.isSuccess = isSuccess;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}