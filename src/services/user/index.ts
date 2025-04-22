/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";
import { Cart } from "@/types/cart.type";
import { Favorite } from "@/types/favorite.type";

const endpoint = "/api/user";

export const userServices = {
  getAllUsers: () => instance.get(endpoint),
  updateUser: (id: string, data: { role: string; updated_at: Date }) =>
    instance.put(`${endpoint}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`/api/user/${id}`),

  getProfile: () => instance.get(`${endpoint}/profile`),
  updateProfile: (data: any) => instance.put(`${endpoint}/profile`, { data }),

  getFavorite: () => instance.get(`${endpoint}/favorite`),
  addToFavorite: (data: { favorites: Favorite[] }) =>
    instance.put(`${endpoint}/favorite`, { data }),
  deleteFavorite: (data: { favorites: Favorite[] }) =>
    instance.put(`${endpoint}/favorite`, { data }),

  getCart: () => instance.get(`${endpoint}/cart`),
  addToCart: (data: { cart: Cart[] }) =>
    instance.put(`${endpoint}/cart`, { data }),
  updateCart: (data: { cart: Cart[]; updated_at: Date }) =>
    instance.put(`${endpoint}/cart`, { data }),
};
