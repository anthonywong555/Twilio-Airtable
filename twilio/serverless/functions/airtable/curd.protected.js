const Airtable = require('airtable');

const ACTION_LIST_RECORDS = 'list';
const ACTION_RETRIEVE_RECORD = 'retrieve';
const ACTION_CREATE_RECORDS = 'create';
const ACTION_UPDATE_RECORDS = 'update';
const ACTION_DELETE_RECORDS = 'delete';

const ACTION_LIST = [
  ACTION_LIST_RECORDS, 
  ACTION_RETRIEVE_RECORD, 
  ACTION_CREATE_RECORDS, 
  ACTION_UPDATE_RECORDS,
  ACTION_DELETE_RECORDS
];

const DEFAULT_AIRTABLE_ENDPOINT_URL = 'https://api.airtable.com';

exports.handler = async(context, event, callback) => {
  try {
    // Validate Event Object
    await validateEvent(context, event);
    const airtableCreds = await generateAuthAirtable(context, event);
    const base = await authAirtable(context, airtableCreds);
    const result = await performAction(context, action, payload, base, baseName);
    
    return callback(null, result);
  } catch (e) {
    return callback(e);
  }
};

const validateEvent = async(context, event) => {
  try {
    /*
     * Check for the following
     * - apiKey
     * - endpointUrl
     * - requestTimeout
     */
    const {action, payload} = event;
    await validatePayload(context, action, payload);
  } catch (e) {
    throw formatErrorMsg(context, 'validateEvent', e);
  }
}

const validatePayload = async(context, action, payload) => {
  try {
    if(!ACTION_LIST.includes(action)) {
      throw 'INVALID ACTION';
    } else if(action )

    JSON.parse(payload);


  } catch (e) {
    throw formatErrorMsg(context, 'validatePayload', e);
  }
}

const formatPayload = async(context, action, payload) => {
  try {
    switch(action) {
      case ACTION_CREATE_RECORDS:
      case ACTION_UPDATE_RECORDS:
      case ACTION_DELETE_RECORDS:
    }
  } catch(e) {
    throw formatErrorMsg(context, 'formatPayload', e);
  }
}

const generateAuthAirtable = async(context, event) => {
  try {
    const airtableCreds = {};

    return airtableCreds;
  } catch (e) {
    throw formatErrorMsg(context, 'generateAuthAirtable', e);
  }
}

/**
 * 
 * @param {*} context 
 * @param {*} airtableCreds Contains AirTable Creds: apiKey, endpointUrl and baseId
 */
const authAirtable = async(context, airtableCreds) => {
  try {
    const {apiKey, endpointUrl, baseId} = airtableCreds;
    const base = new Airtable({apiKey, endpointUrl}).base(baseId);

    return base;
  } catch (e) {
    throw formatErrorMsg(context, 'authAirtable', e);
  }
}

const performAction = async(context, action, payload, base, baseName) => {
  try {
    switch(action) {
      case ACTION_LIST_RECORDS:
        const result = await base(baseName).select(payload);
        return result;
      case ACTION_RETRIEVE_RECORD:
        const result = await base(baseName).find(payload);
        return result;
      case ACTION_CREATE_RECORDS:
        const result = await base(baseName).create(payload);
        return result;
      case ACTION_UPDATE_RECORDS:
        const result = await base(baseName).update(payload);
        return result;
      case ACTION_DELETE_RECORDS:
        const result = await base(baseName).destroy(payload);
        return result;
      default:
        throw "Not valid action";
    }
  } catch (e) {
    throw formatErrorMsg(context, 'performAction', e);
  }
}

function formatErrorMsg(context, functionName, errorMsg) {
  return `
    Twilio Function Path: ${context.PATH} \n 
    Function Name: ${functionName} \n 
    Error Message: ${errorMsg}
  `;
}