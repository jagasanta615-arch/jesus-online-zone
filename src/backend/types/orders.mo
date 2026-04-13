module {
  public type Order = {
    id : Nat;
    serviceName : Text;
    customerName : Text;
    phone : Text;
    email : Text;
    timestamp : Int;
    status : Text;
    fileUrls : [Text];
  };
};
