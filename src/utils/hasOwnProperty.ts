export const hasOwnProperty = <X extends object, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => Object.hasOwnProperty.call(obj, prop);
