import { useEffect, useState } from 'react';

const PaymentSection = ({
  cartItems,
  deliveryType,
  inside,
  outside,
  subside,
  promoDiscount,
  renderMe,
}) => {
  const [total, setTotal] = useState(0);

  let deliveryFee = 0;

  if (deliveryType == "INSIDE") {
    deliveryFee = inside;
  } else if (deliveryType == "SUBSIDE") {
    deliveryFee = subside;
  } else if (deliveryType == "OUTSIDE") {
    deliveryFee = outside;
  } else {
    deliveryFee = 0;
  }

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);



  return (
    <div className="bg-white p-4 mt-4 mb-6 rounded-md max-w-md mx-auto xls:hidden xms:hidden xs:hidden">
      <div>
        {cartItems?.length == 0 ? (
          <p className="font-semibold text-center text-black tracking-wider">
            Your total payable amount is ৳ 0
          </p>
        ) : (
          <>
            {promoDiscount == null || promoDiscount == 0 ? (
              <p className="font-semibold text-center text-black tracking-wider">
                Your total payable amount is ৳{total + Number(deliveryFee)}
              </p>
            ) : (
              <p className="font-semibold text-center text-black tracking-wider">
                Your total payable amount is ৳
                {total + Number(deliveryFee) - Number(promoDiscount)}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSection