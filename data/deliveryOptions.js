export function getDeliveryOption(deliveryOptionId){
    let sameDeliveryItem;

        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
                sameDeliveryItem = option;
            }
        });
    return sameDeliveryItem; //incase delivery item is not found return default value
}

export const deliveryOptions = [{
    id: '1',
    deliveryDays : 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays : 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays : 1,
    priceCents: 999
}];
