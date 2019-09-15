import * as React from 'react';
// @ts-ignore
import Dropzone from 'react-dropzone';
import * as Api from '../util/Api';

// let csv is the CSV file with headers
function csvJSON(csv): any[]{

    const lines = csv.split("\n");

    const result = [];

    const headers = lines[0].split(",");

    for(let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        for(let j = 0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JSON
}

const TAG = '[Upload Modal]';
interface PropTypes {
    onFinish?: (error?: string) => void,
    onSubmit?: () => void,
    onClose?: () => void,
    onUpload?: () => void,
    shouldReload?: () => void,
    onRetrieveData?: (data: any, fd: any) => void,
 }

interface StateTypes {
    attachedFile: any[],
    accepted: any[],
    rejected: any[],
    proptSelect?: boolean,
    uploadText: string,
    btnDisabled: boolean,
    selectMsg?: string,
}

export default class UploadProfiles extends React.Component<PropTypes, StateTypes> {
    private dropzoneRef: React.RefObject<any>;
    private uploadingText: string;

    constructor(props: any) {
        super(props);
        this.state = {
            attachedFile: [],
            accepted: [],
            rejected: [],
            uploadText: 'Upload File',
            btnDisabled: false,
        };
        this.uploadingText = 'Uploading ...';
        this.dropzoneRef = React.createRef();
    }

    onDropListener = (accepted: any, rejected: any) => {
        if (rejected.length > 0) {
            this.setState({ rejected:[rejected] });
            return console.log('bad files');
        }

        this.setState({ accepted });
        this.handleExcel(accepted);
    };

    async handleExcel(file: any) {
        // tslint:disable-next-line:no-console
        console.log(file);
        this.setState({ attachedFile: file });
        // todo: handle rejected files
    }

    public onSubmitExcelUpload = (e: any) => {
        const { onUpload } = this.props;
        onUpload && onUpload();
        this.setState({ uploadText:'Uploading ...', btnDisabled:true });
        const { attachedFile } = this.state;
        if (attachedFile && attachedFile.length > 0) {
            if (attachedFile[0]) {
                this.setState({ proptSelect:false });
                return this.handleFileUpload(
                    attachedFile[0]
                );
            }

            this.setState({ uploadText:'Upload File', btnDisabled:false, proptSelect:true });
        } else {
            this.setState({ uploadText:'Upload File', selectMsg: 'Please select a file.', btnDisabled:false, proptSelect:true });
        }
    };

    handleFileUpload(file: any) {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            // Do whatever you want with the file contents
            const str: string | ArrayBuffer = reader.result;
            const converted: any[] = csvJSON(str);


            console.log(converted);

            for (let i = 0; i < converted.length; i++) {
                let item = converted[i];
                if(item.type === "expense"){
                    try{
                        Api.getData('/expenses', undefined).then((categories) => {
                            item.category = categories[item.category] || 'Accounting'; //upddate cateogry
                            Api.postData("/expenses", item).then(() => {
                                this.setState({uploadText: "Uploaded!"})
                            });
                        });
                    }
                    catch (e) {
                        console.error(e.message);
                        this.setState({uploadText: "Uploaded!"})
                    }
                }
                else if(item.type === 'transaction'){
                    try{
                        // todo check if dummy account exists in database, and make it if need be. It is still signed oo for coop
                        Api.postData("/transaction", item).then(() => {
                            this.setState({uploadText: "Uploaded!"})
                        });
                    }
                    catch (e) {
                        console.error(e.message);
                        this.setState({uploadText: "Uploaded!"})
                    }
                }

            }

        };

        reader.readAsText(file);
    }

    didTapOpenFile = () => {
        this.dropzoneRef.current.open();
    };

    render(){
        const { uploadText, btnDisabled, selectMsg, accepted } = this.state;
        const noUpload = false;
        return (
            <div className="w-50 ml-auto mr-auto flex">
                <Dropzone style={{cursor: 'pointer'}} ref={this.dropzoneRef} onDrop={this.onDropListener}>
                    <div className="text-center" >
                        <p className={'card-text lead'}> Upload expenses and invoices here </p>
                        <h2> <img src={require('../assets/img/document.png')} alt={'document'} style={{ height:'45px', width:'45px' }}/>
                            <br/>
                            Must be <strong>.csv</strong>
                        </h2>
                    </div>
                </Dropzone>
                {this.state.uploadText === this.uploadingText &&
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                {
                    accepted.length > 0 &&
                    <React.Fragment>
                        <h4 className={'pt-2'}>File Selected:</h4>
                        <ul className="upload-file-list">
                            {this.state.accepted.map((f) => <li style={{ fontWeight:'bold' }} key={f.name}><h4><strong>{f.name}</strong></h4></li>)}
                        </ul>
                    </React.Fragment>
                }
                {
                    selectMsg !== "" && accepted.length < 1 ?
                        <p className={'error'}>{selectMsg}</p> : null
                }

                <a className="mb-4 d-block" href="">Click here to see a sample csv file</a>

                <button className="btn btn-success mr-2" onClick={this.didTapOpenFile} disabled={noUpload}>Select File</button>

                <button className={'btn btn-success'}
                        disabled={btnDisabled}
                        onClick={this.onSubmitExcelUpload}>
                    {uploadText}
                </button>
            </div>
        );
    }
}
