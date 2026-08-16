import { loadAssetsNames, loadUsers, loadTechnicians } from '../constFetchedData.js';
import { validateStirng_IsNotEmpty } from '../../validation/workOrderInput.js'

const mainURL = "http://192.168.1.9:5189/api/v1/work-orders";


function getAssetsId(assetName) {
    const assetList = loadAssetsNames();

    for (let asset of assetList) {
        if (asset.name == assetName) {
            return asset.id;
        }
    }

    return -1;
}

function getTechnicianId(technicianName) {
    const technicianList = loadTechnicians();

    for (let technician of technicianList) {
        if (technician.name == technicianName) {
            return technician.id;
        }
    }

    return -1;
}

function getUserId(userName) {
    const usersList = loadUsers();

    for (let user of usersList) {
        if (user.name == userName) {
            return user.id;
        }
    }

    return -1;
}

function isNoteEmpty(NoteText) {
    return (NoteText == "" || NoteText == undefined) ? null : NoteText;
}

function validateInput(list) {

    for (let text in list) {
        if (validateStirng_IsNotEmpty(text)) return true;
    }
}

function makejson() {
    const seType = document.querySelector('#select-Type option');
    const sePriority = document.querySelector('#select-Priority option');
    const inDiscription = document.querySelector('#in-description');
    const seReportedBy = document.querySelector('#select-ReportedBy option');
    const inStartDate = document.querySelector('#in-start-date');
    const inDueDate = document.querySelector('#in-due-date');
    const seAsset = document.querySelector('#select-Asset option');
    const seAssignmentTo = document.querySelector('#select-AssignmentTo option');

    // const seLocation = document.querySelector('#select-Location');
    // const inEstimation = document.querySelector('#in-estimation');
    // const inNote = document.querySelector('#in-note');

    if (!validateInput([inDiscription.textContent.trim()])) {
        return null;
    }



    const MakeWorkOrderObj =
    {
        Description: inDiscription.textContent.trim(),
        AssetID: getAssetsId(seAsset.value),
        Priotity: sePriority.value.trim(),
        type: seType.value.trim(),
        CreatedByID: getUserId(seReportedBy.value.trim()), /// make sure to get the user from cokise or local store browseer
        AssignedToID: getTechnicianId(seAssignmentTo.value.trim()),
        StartDate: inStartDate.value,
        DueDate: inDueDate.value,
        CompeletedDate: null,
        Note: isNoteEmpty("")
    }



    return JSON.stringify(MakeWorkOrderObj);
}

async function addNeWorkeOrder() {

    const data = makejson();

    if (data == null) return false;

    try {

        const response = await fetch(mainURL, {
            method: 'POST'
            , headers:
            {
                "conte-type": 'application/json'
            },
            body: data
        });

        const result = await response.json();

        return true;

    } catch (e) {
        console.log(e);

        return false;
    };


    return false;
}



function Process(color, Message) {

    const Container = document.createElement('div');
    Container.setAttribute('class', 'pop-up');

    Container.style.width = '200px';
    Container.style.height = '200px';
    Container.style.backgroundColor = 'var(--bg-color-table)';
    Container.style.position = 'absolute';
    Container.style.top = '0';
    Container.style.left = '340px';
    Container.style.zIndex = '999';

    const textbox = document.createElement('p');
    textbox.setAttribute('class', 'message');
    textbox.textContent = Message;
    textbox.style.padding = 'var(--space-1) var(--space-3)';
    textbox.style.color = color;

    Container.appendChild(textbox);


    return Container;
}


export async function sendNewWorkorder() {


    const succeed = await addNeWorkeOrder();

    if (!succeed) {
        // represent an error on screen

        console.log("Error occurred when send data");
        Process('var(--destructive-color)', "the oparation has been done");
        return;
    }


    // make box to show the proccess has ben done

    Process('var(--success-color)', "the oparation has been done");
}