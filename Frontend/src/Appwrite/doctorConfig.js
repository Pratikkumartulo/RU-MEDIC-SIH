import { Client, Account, ID } from "appwrite";
import conf from "../config/EnvConfig";
import DocumentService from "./CreateDocument";


export class AppwriteUserServise{
    client = new Client();
    account;
    users;
    constructor(){
        this.client
        .setProject(conf.projectID);
        this.account = new Account(this.client);
    }
    async createDoctorAccount({specialization,hospital,name,phone,age,gender,address,email,password}){
        console.log("Hello world")
        console.log({specialization,hospital,name,phone,age,gender,address,email,password})
        try {
            const userAcount = await this.account.create(ID.unique(),email,password,name,phone);
            if(userAcount){ // Extract user ID from the created user

                const docCreated = await DocumentService.CreateDoctor({
                    email,name,contact:phone,specializations:specialization,hospital
                });
                console.log(docCreated);
                const userCreated = await DocumentService.CreateUser({
                    email,password,name,phone,age,gender,address,role:'doctor',docid:'id',specialization,docId:docCreated.$id
                });
                
                const updated = await DocumentService.updateDoctor(userCreated,docCreated,specialization);

                if (updated) {
                    // await this.login({email,password});
                    return docCreated;
                } else {
                    return { status: false, msg: "Failed to save user data in DocumentService." };
                }
            }else{
                return userAcount;
            }
        } catch(err){
            console.log(err);
            throw err;
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(err){
            throw err;
        }
    }
    
    // async Userlogin({email,password}){
    //     try{
    //         // const res = await this.account.updatePrefs({ userType: "doctor" });
    //         // const res1 =await this.account.updateLabels(response.$id, ["User"]);
    //         // console.log(res);
    //         // console.log(res1);
    //         return await this.account.createEmailPasswordSession(email, password);
    //     }catch(err){
    //         throw err;
    //     }
    // }
    async getCurrentDoctor(){
        try{
            return await this.account.get();
        }catch(err){
            console.error("Failed to get doctor:");
            return null;
        }
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(err){
            throw err;
        }
    }
}

const authDocService = new AppwriteUserServise();
export default authDocService;