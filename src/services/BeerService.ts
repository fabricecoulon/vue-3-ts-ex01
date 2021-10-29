import http from "@/http-common";

/* eslint-disable */
class BeerService {
  getAll(): Promise<any> {
    return http.get("/beers");
  }

  get(id: any): Promise<any> {
    return http.get(`/beers/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/beers", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/beers/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/beers/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/beers`);
  }

  findByName(name: string): Promise<any> {
    return http.get(`/beer-find/${name}`);
  }
}

export default new BeerService();
