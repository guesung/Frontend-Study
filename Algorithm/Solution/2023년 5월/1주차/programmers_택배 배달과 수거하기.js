function solution(cap, n, deliveries, pickups) {
  let now_cap;
  let sum = 0;

  while (1) {
    //         종료 조건 : deliveries의 모든 요소 = 0 && pickups의 모든 요소 = 0
    //         cap에서 시작
    let isDeliveryDone = deliveries.every((delivery) => delivery === 0);
    let isPickupDone = pickups.every((pickup) => pickup === 0);
    if (isDeliveryDone && isPickupDone) {
      break;
    }

    let last_delivery = 0;
    let last_pickup = 0;
    for (let i = 0; i < n; i++) {
      if (deliveries[i] > 0) last_delivery = i;
      if (pickups[i] > 0) last_pickup = i;
    }
    let last = Math.max(last_pickup, last_delivery);

    //         출발
    if (!isDeliveryDone) {
      now_cap = cap;
      for (let i = last; i >= 0; i--) {
        if (now_cap === 0) break;
        if (deliveries[i] > 0) {
          let give = Math.min(deliveries[i], now_cap);
          now_cap -= give;
          deliveries[i] -= give;
        }
      }
    }
    //          복귀
    if (!isPickupDone) {
      now_cap = cap;
      for (let i = last; i >= 0; i--) {
        if (now_cap === 0) break;
        if (pickups[i] > 0) {
          let give = Math.min(pickups[i], now_cap);
          now_cap -= give;
          pickups[i] -= give;
        }
      }
    }
    sum += last + 1;
  }
  return sum * 2;
}
