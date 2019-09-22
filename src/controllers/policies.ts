import axios, { AxiosResponse } from "axios";
import { Client } from "./users";

export interface Policy {
  id: string;
  amountInsured: number;
  email: string;
  inceptionDate: string;
  installmentPayment: boolean;
  clientId: string;
}

const clientUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policyUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

// export const getPoliciesByUserName = (req, res, next) => {
//   const name = req.query.name;
//   axios
//     .get("http://www.mocky.io/v2/5808862710000087232b75ac")
//     .then(({ data }: AxiosResponse) => {
//       const clients: Client[] = data.clients;
//       return clients.find(client => client.name === name);
//     })
//     .then((client: Client) => {
//       axios
//         .get("http://www.mocky.io/v2/580891a4100000e8242b75c5")
//         .then(({ data }: AxiosResponse) => {
//           const policies: Policies[] = data.policies;
//           const response: Policies[] = policies.filter(
//             policy => policy.clientId === client.id
//           );
//           res.json(response);
//         });
//     });
// };

export const getPoliciesByUserName = async (req, res, next) => {
  const { name, role } = req.query;

  if (role !== "admin") {
    res.json({ message: "user is not allowed" });
  }
  const clientResults: AxiosResponse = await axios.get(clientUrl);
  const policyResults: AxiosResponse = await axios.get(policyUrl);
  const client: Client = clientResults.data.clients.find(
    client => client.name === name
  );
  const policy: Policy[] = policyResults.data.policies.filter(
    policy => policy.clientId === client.id
  );
  res.json(policy);
};
