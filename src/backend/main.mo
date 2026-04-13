import Types "types/orders";
import OrdersLib "lib/orders";
import List "mo:core/List";

actor {
  let orders = List.empty<Types.Order>();
  var nextOrderId : Nat = 0;

  public func addOrder(
    serviceName : Text,
    customerName : Text,
    phone : Text,
    email : Text,
    fileUrls : [Text],
  ) : async Nat {
    let order = OrdersLib.create(orders, nextOrderId, serviceName, customerName, phone, email, fileUrls);
    nextOrderId += 1;
    order.id;
  };

  public query func getOrders() : async [Types.Order] {
    OrdersLib.getAll(orders);
  };

  public func updateOrderStatus(id : Nat, status : Text) : async Bool {
    OrdersLib.updateStatus(orders, id, status);
  };
};
