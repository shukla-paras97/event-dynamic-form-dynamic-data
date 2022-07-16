const express = require("express");
const Event= require("../models/event");
const Field = require("../models/field");
const Option = require("../models/option");
const eventData = require("../models/eventdata");
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const { options } = require("../routes/event.route");
const option = require("../models/option");
const { path } = require("express/lib/application");
const field = require("../models/field");


        
exports.createEvent=async(request,response,next)=>{
    try{
        
        let responseCode;

        let {eventFields}=request.body;
        let eventFieldIds=[];
        for(let eventField of eventFields) {
            let optionIds=[];
            for(let option of eventField.options){
                const newOption = new Option(option);
                let savedOption= await newOption.save();
                optionIds.push(savedOption._id);
                console.log(savedOption);
            }
            eventField.options=optionIds
            const newField = new Field(eventField);
            let savedField = await newField.save();
            eventFieldIds.push(savedField._id)
            console.log(savedField)
        }
        request.body.eventFields=eventFieldIds        
        const newEvent = new Event(request.body);
        const savedEvent = await newEvent.save();

        
        if(!savedEvent){
            responseCode=4001;
        } else{
            responseCode=2001;
        }
        return apiResponder(request, response, next, true, responseCode, {});
    }catch(error){
        next(error);
    }


    
}


exports.getEvent= async(request,response,next)=>{
    try{
        let responseCode;
        let event =await Event.findOne({_id:request.body._id})
        .populate({path:"eventFields", select:'elementtype label options mandatory ',
        populate:{path:"options", select:'option'}
    })
        
        if(!event){
            responseCode=4002;
            return apiResponder(request,response,next,true,responseCode,{});
        }
        responseCode=2002;
        return apiResponder(request,response,next,true,responseCode,event);
    }catch(error){
        next(error);
    }
}





exports.addEventData=async(request,response,next)=>{
    try{
        if(errorHandler.validate(['eventId','fields'], request.body)){
            return errorHandler.createError(1003);
        }
        let responseCode;
            let event = await Event.findOne({_id:request.body.eventId});
            // console.log(event);
            if(event){
                const data= new eventData(request.body);
                console.log(data);
                let savedData= await data.save(); 
                if(!savedData){
                    responseCode=4003;
                } else{
                    responseCode=2003;
                }
            }   
                               
       
        return apiResponder(request, response, next, true, responseCode, {});
    }catch(error){
        

        next(error);
    }
}


exports.getEventData = async(request,response,next)=>{
    try{
        if(errorHandler.validate(['eventId'], request.body)){
            return errorHandler.createError(1003);
        }
        
        let responseCode;
        let data = await eventData.findOne({eventId:request.body.eventId},{eventId:1,_id:0,"fields.fieldId":1,"fields.value":1} )
        .populate({path:"eventId", select:'eventPurpose'})
        .populate({path:"fields.fieldId" ,select:'elementtype label -_id'});
        // console.log(data);
        let responsebody={};
        responsebody.event =data.eventId;
        let fields=[];
        data.fields.forEach(element => {
            fields.push({"elementtype":element.fieldId.elementtype,"label":element.fieldId.label,"value":element.value});
        });
        responsebody.fields= fields;
        if(!data){
            responseCode=4004;
            return apiResponder(request,response,next,true,responseCode,{});
        }
        responseCode=2004;
        return apiResponder(request,response,next,true,responseCode,responsebody);
    }catch(error){
        next(error);
    }

}



 

