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
    async createAccount({email,password,name,phone,age,gender,address}){
        try {
            const userAcount = await this.account.create(ID.unique(),email,password,name);
            if(userAcount){
                const userId = userAcount.$id; // Extract user ID from the created user
                const userCreated = await DocumentService.CreateUser({
                    email,password,name,phone,age,gender,address
                });

                if (userCreated) {
                    await this.login({email,password});
                    return { status: true, msg: "Account created successfully!" };
                } else {
                    return { status: false, msg: "Failed to save user data in DocumentService." };
                }
            }else{
                return userCreated;
            }
        } catch(err){
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
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.error("Failed to get user:");
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
    async login({email,password}){
        try{
            //first check if ay user is logged in or not
            const isLoggedin = this.getCurrentUser();
            if(isLoggedin!=null){
                this.logout();
            }
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await DocumentService.getUserByEmail(session.providerUid);
            if(user){
                return user;
            }else{
                return {status:false, msg:"User data not found"};
            }
        }catch(err){
            throw err;
        }
    }
    
}

const authServie = new AppwriteUserServise();
export default authServie;