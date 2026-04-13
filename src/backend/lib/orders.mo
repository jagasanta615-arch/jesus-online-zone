import Types "../types/orders";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Order = Types.Order;

  public func create(
    orders : List.List<Order>,
    nextId : Nat,
    serviceName : Text,
    customerName : Text,
    phone : Text,
    email : Text,
    fileUrls : [Text],
  ) : Order {
    let order : Order = {
      id = nextId;
      serviceName;
      customerName;
      phone;
      email;
      timestamp = Time.now();
      status = "pending";
      fileUrls;
    };
    orders.add(order);
    order;
  };

  public func getAll(orders : List.List<Order>) : [Order] {
    orders.toArray();
  };

  public func updateStatus(
    orders : List.List<Order>,
    id : Nat,
    status : Text,
  ) : Bool {
    var found = false;
    orders.mapInPlace(
      func(order) {
        if (order.id == id) {
          found := true;
          { order with status };
        } else {
          order;
        };
      }
    );
    found;
  };
};
