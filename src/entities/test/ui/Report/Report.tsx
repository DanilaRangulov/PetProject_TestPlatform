import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StateScheme} from "app/providers/StoreProvider";
import {getResponse} from "entities/test/services/getResponse";
import * as classes from "entities/test/ui/Questions/questions.module.scss";
import SwitchButton, {ButtonTheme} from "shared/ui/switchButton/SwitchButton";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ErrorWidget from "widgets/ErrorWidget/ErrorWidget";



const POLL_INTERVAL = 10000;

const Report = () => {
    const [numPages, setNumPages] = useState(null);
    const dispatch = useDispatch<any>();
    const {
        taskId,
        reportStatus,
        reportUrl,
        blobUrl,
        reportStatusError
    } = useSelector((state: StateScheme) => state.test);
    const intervalRef = useRef(null);
    useEffect(() => {
        const fetchStatus = () => dispatch(getResponse(taskId));

        if (reportStatus !== 'ready' && reportStatus !== 'failed') {
            fetchStatus();
            intervalRef.current = setInterval(fetchStatus, POLL_INTERVAL);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, [taskId, reportStatus, dispatch]);
    const onClickOpenReport = useCallback(() => {
        window.open(blobUrl, '_blank');
    },[reportUrl])
    const onClickDownloadReport = useCallback(() => {
        window.open(reportUrl, '_blank');
    },[reportUrl])
    return (
        <div>
            <h1 className={'title3'} style={{marginBottom: '8px'}}>Результаты теста</h1>
            {
                reportStatus === 'ready'
                    ? <p className={'regular16'}>Результаты теста готовы.</p>
                    : <p className={'regular16'}>Ваши ответы анализируются.. Осталось еще чуть-чуть!</p>
            }
            {
                reportStatusError
                    ? <ErrorWidget/>
                    : null
            }
            {blobUrl && (
                <iframe
                    src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${reportUrl}`}
                    width="100%"
                    height="800"
                    style={{border: "none"}}
                />
            )}
            <div className={classes.btns}>
                <SwitchButton
                    disabled={reportStatus != 'ready'}
                    onClick={onClickDownloadReport}
                    theme={ButtonTheme.BACK}
                >
                    <span>Скачать отчет PDF</span>
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.0569 8.11103L9.49942 11.6685M9.49942 11.6685L5.94194 8.11103M9.49942 11.6685L9.49942 0.99707M17.5028 13.4461C17.5028 15.4109 15.91 17.0036 13.9453 17.0036H5.05358C3.08883 17.0036 1.49609 15.4109 1.49609 13.4461"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                </SwitchButton>
                <SwitchButton
                    disabled={reportStatus != 'ready'}
                    onClick={onClickOpenReport}
                    theme={ButtonTheme.NEXT}
                >
                    <span>Посмотреть результат</span>
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.15938 5.70723L3.07682 5.70723C2.12833 5.70723 1.35938 6.47619 1.35938 7.42467C1.35938 7.99395 1.64162 8.52675 2.11298 8.84643L7.8317 12.7219C9.14114 13.609 10.8586 13.609 12.168 12.7219L17.8848 8.84739C18.3571 8.52771 18.6394 7.99491 18.6394 7.42563C18.6394 6.47715 17.8704 5.70723 16.9219 5.70723H13.8394M1.35938 7.44003L1.35938 16.2672C1.35938 17.328 2.21858 18.1872 3.27937 18.1872L16.7194 18.1872C17.7802 18.1872 18.6394 17.328 18.6394 16.2672L18.6394 7.44003M1.89505 17.5987L7.19809 12.2957M12.7987 12.2947L18.1018 17.5978M9.99841 0.907227V7.57539M9.99841 0.907227L11.9184 2.82723M9.99841 0.907227L8.07841 2.82723"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </SwitchButton>
            </div>
        </div>
    );
};

export default Report;