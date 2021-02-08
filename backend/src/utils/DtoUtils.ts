export function resolveDto<T, K extends keyof T>(o: T, key: K): T {
  const keys: string[] = Object.keys(o[key]);
  let resolvedDto: T = {} as T;

  keys.forEach(k => {
    resolvedDto[k] = o[key][k];
  });

  return resolvedDto;
}
