import type { AxiosResponse } from "axios";
import api from "../services/api";
import type {
    GetProjectOutput,
    ProjectCreationInput,
} from "./types/project-types";
import type { PopulatedProject } from "./project/types/project-types";

export const getProjects = async (
    query
): Promise<AxiosResponse<GetProjectOutput[]>> => {
    try {
        console.log(query);
        const response: AxiosResponse<GetProjectOutput[]> = (await api.get(
            `/projects?type=${query}`
        )) as unknown as AxiosResponse<GetProjectOutput[]>;
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getProjectByID = async (
    ID: string
): Promise<AxiosResponse<PopulatedProject>> => {
    try {
        const response: AxiosResponse<PopulatedProject> = await api.get(
            `/projects/${ID}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

// export const getProjects = async () => {
//     // this returns an array of the projects that the user has access to, if he is supervisor he will get all projects he supervises, if he is project holder he will get an array of only on project, admin will get all projects
//     try {
//         const response = await api.get(`/projects`);
//         // The next return statement is for testing, delete it and return response variable
//         return {
//             status: 200,
//             data: [
//                 {
//                     type: "startup",
//                     resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi repellendus dolorem quae voluptates voluptas dolorum neque sint, magnam debitis quos blanditiis quasi quia sunt magni mollitia odit asperiores ad perspiciatis! Totam eum tempore quod natus iusto odit, cupiditate modi eveniet suscipit! Dolorem adipisci totam quibusdam veritatis ex nesciunt! Magnam asperiores laudantium placeat repellendus harum officiis fugit voluptas modi, sit voluptate! Itaque qui sint reprehenderit earum pariatur modi vitae, repudiandae magni aliquam eligendi ad officiis, cum consequuntur. Autem sint porro ad minima, aliquid possimus unde numquam maxime fuga, asperiores dolore tempora? Necessitatibus, ullam neque itaque saepe, reiciendis architecto id libero quos fugit dignissimos fuga cupiditate veniam nostrum laborum eligendi exercitationem ab iste ratione, beatae nam. Similique quos aspernatur odit? Neque, dolor. Placeat, dolorum sequi veritatis neque sit exercitationem quod voluptatem, soluta distinctio nemo id molestiae dolor quam numquam incidunt laborum non eius facilis deserunt, animi temporibus debitis? Similique quibusdam quod numquam?",
//                     brand_name: "brandName",
//                     product_name: "productName",
//                     created_at: "2023-04-27T01:01:47.967Z",
//                     owner: {
//                         email: "hha@gmail.com",
//                         first_name: "john",
//                         last_name: "doe",
//                     },
//                     supervisor: {
//                         user: {
//                             email: "wahed@gmail.com",
//                             first_name: "mohamed",
//                             last_name: "amine",
//                         },
//                     },
//                     co_supervisor: {
//                         user: {
//                             email: "hahahwee@gmail.com",
//                             first_name: "abdallah",
//                             last_name: "jawad",
//                         },
//                     },
//                     validation: {
//                         decision: "favorable",
//                     },
//                     members: [
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                     ],
//                 },
//                 {
//                     type: "startup",
//                     resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi repellendus dolorem quae voluptates voluptas dolorum neque sint, magnam debitis quos blanditiis quasi quia sunt magni mollitia odit asperiores ad perspiciatis! Totam eum tempore quod natus iusto odit, cupiditate modi eveniet suscipit! Dolorem adipisci totam quibusdam veritatis ex nesciunt! Magnam asperiores laudantium placeat repellendus harum officiis fugit voluptas modi, sit voluptate! Itaque qui sint reprehenderit earum pariatur modi vitae, repudiandae magni aliquam eligendi ad officiis, cum consequuntur. Autem sint porro ad minima, aliquid possimus unde numquam maxime fuga, asperiores dolore tempora? Necessitatibus, ullam neque itaque saepe, reiciendis architecto id libero quos fugit dignissimos fuga cupiditate veniam nostrum laborum eligendi exercitationem ab iste ratione, beatae nam. Similique quos aspernatur odit? Neque, dolor. Placeat, dolorum sequi veritatis neque sit exercitationem quod voluptatem, soluta distinctio nemo id molestiae dolor quam numquam incidunt laborum non eius facilis deserunt, animi temporibus debitis? Similique quibusdam quod numquam?",
//                     brand_name: "brandName",
//                     product_name: "productName",
//                     created_at: "2023-04-27T01:01:47.967Z",
//                     owner: {
//                         email: "hha@gmail.com",
//                         first_name: "john",
//                         last_name: "doe",
//                     },
//                     supervisor: {
//                         user: {
//                             email: "wahed@gmail.com",
//                             first_name: "mohamed",
//                             last_name: "amine",
//                         },
//                     },
//                     co_supervisor: {
//                         user: {
//                             email: "hahahwee@gmail.com",
//                             first_name: "abdallah",
//                             last_name: "jawad",
//                         },
//                     },
//                     validation: {
//                         decision: "favorable",
//                     },
//                     members: [
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                         {
//                             email: "hha@gmail.com",
//                             first_name: "john",
//                             last_name: "doe",
//                         },
//                     ],
//                 },
//             ],
//         };
//         // stop deletion here
//     } catch (error) {
//         console.error(error);
//     }
// };

export const register = async (input: ProjectCreationInput) => {
    try {
        const response = await api.post("/projects/", input);
        return response;
    } catch (error) {
        console.error(error);
    }
};
