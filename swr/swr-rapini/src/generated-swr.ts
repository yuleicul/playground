import type { AxiosInstance, AxiosRequestConfig } from "axios";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
export type RandomThing = {
  id: number;
  something: {
    hello?: {
      one?: string;
      two?: number;
    };
    world?: string;
    bla?: {
      prop?: string;
      erty?: string;
    }[];
  };
};
export type Pet = {
  id: number;
  name: string;
  tag?: string | null;
  petType?: ("cat" | "doge") | null;
  nicknames?: {
    name?: string;
    thing?: string[];
  }[];
  random?: RandomThing;
};
export type Pets = Pet[];
export type Animal = {
  home?: string;
  pet?: Pet;
};
export type Cat = Pet & {
  name?: string;
};
export type Dog = Pet & {
  bark?: string;
  fur?: string[][];
};
export type Photo = {
  id: number;
  date?: string;
};
export type Photos = Photo[];
export type MyResponseType = Cat | Dog;
export type MyResponseTypeTwo = Cat | Dog;
export type Error = {
  code: number;
  message: string;
};
export type User = {
  id?: number;
  username?: string;
};
export type MyDictionary = {
  [key: string]: string;
};
export type MyDictionaryAny = {
  [key: string]: any;
};
export type MyDictionaryStringArray = {
  [key: string]: string[];
};
export type MyDictionaryRef = {
  [key: string]: User;
};
export type MyDictionaryValue = {
  [key: string]: {
    code?: number;
    text?: string;
  };
};
export type AxiosConfig = {
  paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export type Config = {
  axios?: AxiosConfig;
};
export function initialize(axios: AxiosInstance, config?: Config) {
  const requests = makeRequests(axios, config?.axios);
  const queryIds = makeQueryIds();
  return {
    requests,
    queryIds,
    queries: makeQueries(requests, queryIds),
  };
}
function nullIfUndefined<T>(value: T): T | null {
  return typeof value === "undefined" ? null : value;
}
function makeQueryIds() {
  return {
    listPets: (limit?: number) => ["listPets", nullIfUndefined(limit)] as const,
    showPetById: (petId: string) => ["showPetById", petId] as const,
    listPetPhotos: (petId: string) => ["listPetPhotos", petId] as const,
  } as const;
}
function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
  return {
    listPets: (limit?: number) =>
      axios
        .request<Pets>({
          method: "get",
          url: `/pets`,
          params: {
            ...(limit !== undefined ? { limit } : undefined),
          },
          paramsSerializer: config?.paramsSerializer,
        })
        .then((res) => res.data),
    createPets: (payload: Pet) =>
      axios
        .request<unknown>({
          method: "post",
          url: `/pets`,
          data: payload,
        })
        .then((res) => res.data),
    showPetById: (petId: string) =>
      axios
        .request<Pets>({
          method: "get",
          url: `/pets/${petId}`,
        })
        .then((res) => res.data),
    listPetPhotos: (petId: string) =>
      axios
        .request<Photos>({
          method: "get",
          url: `/pets/${petId}/photos`,
        })
        .then((res) => res.data),
    postPetPhoto: (payload: Photo, petId: string) =>
      axios
        .request<unknown>({
          method: "post",
          url: `/pets/${petId}/photos`,
          data: payload,
        })
        .then((res) => res.data),
  } as const;
}
function makeQueries(
  requests: ReturnType<typeof makeRequests>,
  queryIds: ReturnType<typeof makeQueryIds>
) {
  return {
    useListPets: (
      limit?: number,
      options?: SWRConfiguration<
        Awaited<ReturnType<typeof requests.listPets>>,
        undefined
      >
    ): SWRResponse<Awaited<ReturnType<typeof requests.listPets>>, unknown> =>
      useSWR(queryIds.listPets(limit), () => requests.listPets(limit), options),
    useShowPetById: (
      petId: string,
      options?: SWRConfiguration<
        Awaited<ReturnType<typeof requests.showPetById>>,
        undefined
      >
    ): SWRResponse<Awaited<ReturnType<typeof requests.showPetById>>, unknown> =>
      useSWR(
        queryIds.showPetById(petId),
        () => requests.showPetById(petId),
        options
      ),
    useListPetPhotos: (
      petId: string,
      options?: SWRConfiguration<
        Awaited<ReturnType<typeof requests.listPetPhotos>>,
        undefined
      >
    ): SWRResponse<
      Awaited<ReturnType<typeof requests.listPetPhotos>>,
      unknown
    > =>
      useSWR(
        queryIds.listPetPhotos(petId),
        () => requests.listPetPhotos(petId),
        options
      ),
  } as const;
}
