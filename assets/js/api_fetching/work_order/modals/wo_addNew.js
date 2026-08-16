// import { makejson } from './work_order_api_add.js';

export function MakeModalContinaer() {
    const CreateWO = document.createElement("section");
    CreateWO.setAttribute("id", 'wo-continare');

    CreateWO.style.width = 'calc(100vw - 600px)';
    // CreateWO.style.height = 'calc(100vh - 200px)';
    CreateWO.style.backgroundColor = 'var(--card-color)';
    CreateWO.style.borderRadius = 'var(--radius-md)';
    CreateWO.style.padding = 'var(--space-2) var(--space-4)';

    CreateWO.style.position = 'absolute';
    CreateWO.style.top = '20px';
    CreateWO.style.left = '340px';
    CreateWO.style.zIndex = '9999';

    document.body.insertAdjacentElement('afterbegin', CreateWO);

    return CreateWO;
}

export function MakeblurBackGournd() {
    const blurBackGround = document.createElement('div');
    blurBackGround.setAttribute('id', "blur-background");

    blurBackGround.style.backdropFilter = 'blur(3px)';
    blurBackGround.style.backgroundColor = 'rgb(83 79 79 / 75%)';
    blurBackGround.style.width = '100vw';
    blurBackGround.style.height = '150vh';
    blurBackGround.style.zIndex = '999';
    blurBackGround.style.position = 'absolute';
    blurBackGround.style.top = '0';
    blurBackGround.style.left = '0';

    document.body.style.height = "150vh";


    document.body.insertAdjacentElement('afterbegin', blurBackGround);

    return blurBackGround;
}

export function appendHeroPart(headingTitle, headingSubTitle, iconSource, textTransformParg = 'lowercase', IconbackgroundColor = 'var(--bg-color-primary)') {

    // crate elements
    const create_header = document.createElement('header');
    const create_headerContant = document.createElement('div');
    const create_textSection = document.createElement('div');

    const create_imageContinare = document.createElement('div');
    const create_img = document.createElement('img');
    const create_headingH2 = document.createElement("h2");
    const create_paragraphText = document.createElement("p");
    const create_textContiner = document.createElement('div');
    const create_colseBtn = document.createElement('button');

    // set attributes
    create_header.setAttribute('class', "hero-part");
    create_headerContant.setAttribute('class', 'text-and-btn');
    create_textSection.setAttribute('class', 'details-contant');
    create_headingH2.setAttribute('id', "heading-title");
    create_imageContinare.setAttribute('class', 'wo-icon');
    create_img.setAttribute('class', 'icon')
    create_paragraphText.setAttribute('id', "heading-subtitle");
    create_textContiner.setAttribute('id', "text-continer")
    create_colseBtn.setAttribute('id', "close-Wo-page");


    // stylesheet

    // header
    create_header.style.borderBottom = '1.5px solid rgb(127 124 124 / 18%)';
    create_header.style.padding = 'var(--space-4) var(--space-2)';
    // create_header.style.borderBottom = 'var(--sp';

    // header contant
    create_headerContant.style.display = 'flex';
    create_headerContant.style.justifyContent = 'space-between';
    create_headerContant.style.alignItems = 'center';

    // heading two and text
    create_headingH2.textContent = headingTitle;
    create_paragraphText.textContent = headingSubTitle;

    create_headingH2.style.color = 'var(--foreground-text-color)';
    create_paragraphText.style.textTransform = textTransformParg;
    create_paragraphText.style.color = 'var(--muted-foreground-text-color)';

    create_textContiner.appendChild(create_headingH2);
    create_textContiner.appendChild(create_paragraphText);

    // icon 
    create_img.src = iconSource;
    create_img.alt = 'work order icon';
    create_imageContinare.appendChild(create_img);

    create_imageContinare.style.borderRadius = '25px';
    create_imageContinare.style.display = 'flex';
    create_imageContinare.style.justifyContent = 'center';
    create_imageContinare.style.alignItems = 'center';
    create_imageContinare.style.padding = '3px';
    create_imageContinare.style.backgroundColor = IconbackgroundColor;



    // button
    create_colseBtn.textContent = 'X';
    create_colseBtn.style.padding = 'var(-space-4)';
    create_colseBtn.style.backgroundColor = 'transparent';
    create_colseBtn.style.border = 'none';
    create_colseBtn.style.fontWeight = 'bold';
    create_colseBtn.style.color = 'red';
    create_colseBtn.style.fontFamily = 'cursive';
    create_colseBtn.style.fontSize = '15px';
    create_colseBtn.style.cursor = 'pointer';

    // text section

    create_textSection.style.display = 'flex';
    create_textSection.style.alignItems = 'center';
    create_textSection.style.gap = '0 var(--space-3)';



    // append operations
    create_textSection.appendChild(create_imageContinare);
    create_textSection.appendChild(create_textContiner);
    create_headerContant.appendChild(create_textSection);
    create_headerContant.appendChild(create_colseBtn);

    create_header.appendChild(create_headerContant);

    return create_header;
}

function CreateHeadingEle(headingText) {
    const createHeading = document.createElement('h3');
    createHeading.setAttribute('class', 'heading-h3');

    createHeading.textContent = headingText;
    createHeading.style.fontWeight = 'blod';
    createHeading.style.color = 'var(--accent-color)';
    createHeading.style.marginBottom = '.3rem';

    return createHeading;
}

// general information;
function createDateTimeSelectWithLable(valueDate, forValue, isAstriskMandatory = true) {

    const DateTimeNow = new Date().toISOString();

    const dateTimeInput = document.createElement('input');
    dateTimeInput.setAttribute('id', `in-${forValue}`);
    dateTimeInput.setAttribute('type', "datetime-local");
    dateTimeInput.setAttribute('min', `${DateTimeNow.substring(0, 16)}`);
    dateTimeInput.setAttribute('value', `${DateTimeNow.substring(0, 16)}`);

    dateTimeInput.style.padding = 'var(--space-1) var(--space-1)';
    dateTimeInput.style.width = '100%';
    dateTimeInput.style.border = '1px solid #acabad';
    dateTimeInput.style.cursor = 'pointer';
    dateTimeInput.style.marginTop = '.5rem';
    dateTimeInput.style.outline = 'none';


    const crateLable = document.createElement('label');
    crateLable.setAttribute('for', `in-${forValue}`);

    if (!isAstriskMandatory) {

        crateLable.innerHTML = `<p>${valueDate}</p>`;
    } else {
        crateLable.innerHTML = `<p>${valueDate} ${createRedAstrisk().outerHTML}</p>`;

    }
    crateLable.style.width = '100%';
    crateLable.style.marginTop = 'var(--space-3)';
    crateLable.style.display = 'block';

    crateLable.insertAdjacentElement('beforeend', dateTimeInput);

    return crateLable;
}

function createRedAstrisk() {

    const crateAstrisk = document.createElement('span');
    crateAstrisk.setAttribute('class', 'red-astrisk');
    crateAstrisk.textContent = '*';
    crateAstrisk.style.color = 'red';
    crateAstrisk.style.verticalAlign = 'sub';

    return crateAstrisk;
}

function createSelectWithLable(value, optionlist, isAstriskMandatory = true) {


    const createSelectFiled = document.createElement('select');
    createSelectFiled.setAttribute('id', `select-${value}`);
    createSelectFiled.setAttribute('name', `wo-${value}`);

    createSelectFiled.style.padding = 'var(--space-1) var(--space-1)';
    createSelectFiled.style.width = '100%';
    createSelectFiled.style.border = '1px solid #acabad';
    createSelectFiled.style.cursor = 'pointer';
    createSelectFiled.style.marginTop = '.5rem';
    createSelectFiled.style.outline = 'none';



    for (let option of optionlist) {
        const crateOptionEle = document.createElement('option');
        crateOptionEle.value = option;
        crateOptionEle.textContent = option;
        createSelectFiled.appendChild(crateOptionEle);
    }

    const crateLable = document.createElement('label');
    crateLable.setAttribute('for', `select-${value}`);
    crateLable.innerHTML = `<p>${value} ${createRedAstrisk().outerHTML}</p>`;

    if (!isAstriskMandatory) {

        crateLable.innerHTML = `<p>${value}</p>`;
    } else {
        crateLable.innerHTML = `<p>${value} ${createRedAstrisk().outerHTML}</p>`;

    }

    crateLable.style.width = '100%';

    crateLable.insertAdjacentElement('beforeend', createSelectFiled);

    return crateLable;
}

function appendGeneralInfo() {
    const CraterWrapper = document.createElement('div');
    CraterWrapper.setAttribute('id', 'General-info-wapper');
    CraterWrapper.style.margin = 'var(--space-4) 0';


    const headingH3Text_01 = 'General Information';
    const selectLables = ['Priority', 'Type'];
    const descriptionLableText = 'Description';
    const reportedByLableText = 'ReportedBy';
    const dateStartLableText = 'start date';
    const dueDateLableText = 'Due Date';

    CraterWrapper.appendChild(CreateHeadingEle(headingH3Text_01));

    // crate fields
    const createContinareField = document.createElement('div');
    createContinareField.setAttribute('class', 'field-continer');
    createContinareField.style.display = 'flex';
    createContinareField.style.justifyContent = 'space-around';
    createContinareField.style.alignItems = 'center';
    createContinareField.style.gap = '0 var(--space-5)';
    createContinareField.style.marginBottom = 'var(--space-3)';



    const crateLableType = createSelectWithLable(selectLables[1], ['Preventive', 'Corrective']);
    createContinareField.appendChild(crateLableType);

    const crateLablePriority = createSelectWithLable(selectLables[0], ['High', 'Medium', 'Low']);
    createContinareField.appendChild(crateLablePriority);

    CraterWrapper.appendChild(createContinareField);


    const crateDescriptionField = document.createElement('textarea');
    crateDescriptionField.setAttribute('id', 'in-description');
    crateDescriptionField.setAttribute('placeholder', 'Describe worke order task');

    crateDescriptionField.style.border = '1px solid #acabad';
    crateDescriptionField.style.padding = 'var(--space-1) var(--space-3)';
    crateDescriptionField.style.marginTop = 'var(--space-3)';
    crateDescriptionField.style.marginBottom = 'var(--space-3)';
    crateDescriptionField.style.outline = 'none';
    crateDescriptionField.style.width = '100%';
    crateDescriptionField.style.height = '85px';
    crateDescriptionField.style.font = 'var(--text-size-sm)';
    crateDescriptionField.style.borderRadius = 'var(--radius-sm)';

    const crateDescriptionLableEle = document.createElement('label');
    crateDescriptionLableEle.setAttribute('for', 'in-description');

    crateDescriptionLableEle.innerHTML = `${descriptionLableText} ${createRedAstrisk().outerHTML}`;
    crateDescriptionLableEle.insertAdjacentElement('beforeend', crateDescriptionField);

    CraterWrapper.appendChild(crateDescriptionLableEle);

    // reborted by admins 

    const createReportByLableEle = createSelectWithLable(reportedByLableText, ['John', 'Ali', 'Sabri']);
    CraterWrapper.appendChild(createReportByLableEle);

    // Start Date

    const crateStartWorkOrderDateLable = createDateTimeSelectWithLable(dateStartLableText, "start-date");
    CraterWrapper.appendChild(crateStartWorkOrderDateLable);

    // due date

    const crateDueDateLable = createDateTimeSelectWithLable(dueDateLableText, "due-date");
    CraterWrapper.appendChild(crateDueDateLable);

    return CraterWrapper;
}
// end of general information;

//start Assets information
function appendAssetInfo() {
    const headingH3Text_02 = 'Assets Information';
    const assetLableText = 'Asset';
    const locationLableText = 'Location';


    const CreaterWrapper = document.createElement('div');
    CreaterWrapper.setAttribute('id', 'asset-info-wapper');

    CreaterWrapper.appendChild(CreateHeadingEle(headingH3Text_02));


    const createContainer = document.createElement('div');
    createContainer.setAttribute('class', 'assets-info-continer');

    createContainer.style.display = 'flex';
    createContainer.style.alignItems = 'center';
    createContainer.style.gap = '0 var(--space-5)';

    const createAssetsLable = createSelectWithLable(assetLableText, ["Air compressor #2 (CMP-002)", "Pump #1 (pump-001)"]);
    createContainer.appendChild(createAssetsLable);

    const crateLocationLable = createSelectWithLable(locationLableText, ['Buliding A', 'Buliding B', 'Maintenance Area'], false);
    createContainer.appendChild(crateLocationLable);

    CreaterWrapper.appendChild(createContainer);


    return CreaterWrapper;
}
//end Assets information

// start addtional information;
function appendAssignmentInfo() {
    const headingH3Text_03 = 'Assigment';
    const estimatedLableText = 'Estimated Hours';
    const assignmentLableText = 'AssignmentTo';

    const CreaterWrapper = document.createElement('div');
    CreaterWrapper.setAttribute('id', 'Assignment-info-wapper');
    CreaterWrapper.appendChild(CreateHeadingEle(headingH3Text_03));

    CreaterWrapper.style.marginTop = 'var(--space-3)';

    const createContainer = document.createElement('div');
    createContainer.setAttribute('class', 'assets-info-continer');

    createContainer.style.display = 'flex';
    createContainer.style.alignItems = 'center';
    createContainer.style.gap = '0 var(--space-5)';

    const createAssignmentLable = createSelectWithLable(assignmentLableText, ['Welson john', 'Ebraham Jonior', 'AZidin Ali']);
    createContainer.appendChild(createAssignmentLable);

    const createEstimationinputEle = document.createElement('input');
    createEstimationinputEle.setAttribute('id', 'in-estimation');
    createEstimationinputEle.setAttribute('type', 'text');
    createEstimationinputEle.setAttribute('placeholder', 'for instance 2.5');

    createEstimationinputEle.style.width = '100%';
    createEstimationinputEle.style.padding = 'var(--space-1) var(--space-2)';
    createEstimationinputEle.style.display = 'block';
    createEstimationinputEle.style.marginTop = 'var(--space-3)';
    createEstimationinputEle.style.outline = 'none';
    // createEstimationinputEle.onfocus = () => {
    //     createEstimationinputEle.style.border = '1px solid var(--accent-color)';
    // }

    // CreaterWrapper.appendChild(createEstimationinputEle)

    const crateEstimationLable = document.createElement('label');
    crateEstimationLable.setAttribute('for', `in-estimation`);
    crateEstimationLable.innerHTML = `<p>${estimatedLableText}</p>`;
    crateEstimationLable.style.width = '100%';
    crateEstimationLable.style.display = 'block';

    crateEstimationLable.insertAdjacentElement('beforeend', createEstimationinputEle);


    createContainer.appendChild(crateEstimationLable);

    CreaterWrapper.appendChild(createContainer);

    return CreaterWrapper;
}
// end addtional information;

// crate create Button and cancle

function createButton(className, textContant, backgroundColor, color) {
    const createBtn = document.createElement('button');
    createBtn.setAttribute('class', className);

    createBtn.textContent = textContant;

    createBtn.style.padding = 'var(--space-1) var(--space-3)';
    createBtn.style.borderRadius = 'var(--radius-sm)';
    createBtn.style.border = 'none';
    createBtn.style.backgroundColor = backgroundColor;
    createBtn.style.color = color;
    createBtn.style.cursor = 'pointer';

    return createBtn;
}

function createSaveAndcancleButton() {
    const createBtn = createButton('btn save-workorder', 'Create', 'var(--accent-color)', 'white');
    const Cancel = createButton('btn cancel-workorder', 'Cancel', '#eee', 'var( --foreground-text-color)');

    const createContainer = document.createElement('div');
    createContainer.setAttribute('class', 'btn-continer');

    createContainer.style.display = 'flex';
    createContainer.style.alignItems = 'center';
    createContainer.style.justifyContent = 'flex-end';
    createContainer.style.gap = '0 var(--space-5)';
    createContainer.style.margin = 'var(--space-8) var(--space-2)';

    createContainer.appendChild(Cancel);
    createContainer.appendChild(createBtn);

    return createContainer;
}

export function CloseWorkOrderModal(woContainer, blurContiner) {
    woContainer.remove();
    blurContiner.remove();

    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';

    window.scrollTo({
        top: 50,
        let: 0
    });
}

export function adjustBodySize() {
    document.body.style.height = '200vh';
    window.scrollTo({
        top: 0,
        let: 0
    })
    document.body.style.overflowX = 'hidden';
}
export function RenderCreateWorkOrderModal() {
    adjustBodySize();
    const blurContiner = MakeblurBackGournd();
    const woContainer = MakeModalContinaer();
    woContainer.appendChild(appendHeroPart('Create Work Order', 'add a new mainteance work order', "./assets/icons/to-do-list.png"));
    woContainer.appendChild(appendGeneralInfo());
    woContainer.appendChild(appendAssetInfo());
    woContainer.appendChild(appendAssignmentInfo());
    woContainer.appendChild(createSaveAndcancleButton());

    const CloseWorkOrderBtn = document.querySelector("#close-Wo-page");
    const cancelBtn = document.querySelector('.btn.cancel-workorder');

    cancelBtn.onclick = () => { CloseWorkOrderModal(woContainer, blurContiner) };

    CloseWorkOrderBtn.onclick = () => {

        CloseWorkOrderModal(woContainer, blurContiner);

    };

}



