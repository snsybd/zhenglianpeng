var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var usersSchema=new Schema({
    username:{
        type:String,
        unique:true,
        requird:true
    },
    pwd:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        requird:true,
    },
    meta:{
        createTime:{
            type:Date,
            default:Date.now()
        },
        updateTime:{
            type:Date,
            default:Date.now()
        }
    }
})
usersSchema.pre('save',function (next) {
    if(!this.isNew)this.meta.updateTime=Date.now();
    next()
})
var s1=mongoose.model('s1',usersSchema);
module.exports=s1;