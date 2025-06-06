import React, {useCallback, useRef} from 'react';
import * as classes from "./uploadImageStep.module.scss";
import refreshImage from "shared/assets/images/uploadImageImages/refresh.png";
import uploadImage from "shared/assets/images/uploadImageImages/upload.png";
import {useDispatch, useSelector} from "react-redux";
import {StateScheme} from "app/providers/StoreProvider";
import SwitchButton, {ButtonTheme} from "shared/ui/switchButton/SwitchButton";
import alertImage from 'shared/assets/images/tipImages/alert.png'
import Tip from "shared/ui/Tip/Tip";
import nextArrow from "shared/assets/images/buttonImages/nextArrow.svg"
import ErrorWidget from "widgets/ErrorWidget/ErrorWidget";
import {ImageType, testActions} from "entities/test";
import {sendImages} from "entities/test/services/sendImages";
const UploadImageStep = () => {
    const dispatch = useDispatch<any>();
    const {previews, currentStep, imageStatus, imageError} = useSelector((state: StateScheme) => state.test);
    const filesRef = useRef<Record<ImageType, File | null>>({
        tree: null,
        animal: null,
        self: null,
    });
    const handleChange = useCallback((type: ImageType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            filesRef.current[type] = file;
            const url = URL.createObjectURL(file);
            dispatch(testActions.setPreview({ type, url }));
        }
    },[dispatch]);
    const uploadImageHandle = useCallback(() => {
        if (imageStatus != 'succeeded') {
            const { tree, animal, self } = filesRef.current;
            if (tree && animal && self) {
                dispatch(sendImages({tree, animal, self}))
            }
        } else {
            dispatch(testActions.nextStep())
        }
    }, [dispatch])

    const tipItems = [
        {
            imageUrl: alertImage,
            textContent: 'Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб'
        }
    ]


    return (
        <div className={`${classes.uploadImageBlock} container`}>
            {
                imageError
                    ? <ErrorWidget/>
                    : null
            }
            <h2 className={'title3'} style={{marginBottom: '8px'}}>Загрузка изображений</h2>
            <Tip items={tipItems} classname={classes.Alert}/>
            <div className={classes.containersGrid}>
                <div className={classes.imageContainer}>
                    <input className={classes.fileInput} type="file" accept="image/*" id={'tree'}
                           onChange={handleChange('tree')}/>
                    <label htmlFor={'tree'} className={classes.uploadImageButton}>
                        {previews.tree
                            ?
                            <div className={classes.uploadedImagePreview}>
                                <div className={classes.replaceImageIcon}>
                                    <img src={refreshImage} alt="tree preview"/>
                                </div>
                                <img className={classes.uploadedImage} src={previews.tree} alt="tree preview"/>
                            </div>
                            :
                            <div className={classes.uploadBox}>
                                <img src={uploadImage} alt="tree preview"/>
                            </div>
                        }
                    </label>
                    <p className={'regular16'}>Дом/Дерево/Человек</p>
                </div>
                <div className={classes.imageContainer}>
                    <input className={classes.fileInput} type="file" accept="image/*" id={'animal'}
                           onChange={handleChange('animal')}/>
                    <label htmlFor={'animal'} className={classes.uploadImageButton}>
                        {previews.animal
                            ?
                            <div className={classes.uploadedImagePreview}>
                                <div className={classes.replaceImageIcon}>
                                    <img src={refreshImage} alt="tree preview"/>
                                </div>
                                <img className={classes.uploadedImage} src={previews.animal} alt="tree preview"/>
                            </div>
                            :
                            <div className={classes.uploadBox}>
                                <img src={uploadImage} alt="tree preview"/>
                            </div>
                        }
                    </label>
                    <p className={'regular16'}>Несуществующее животное</p>
                </div>
                <div className={classes.imageContainer}>
                    <input className={classes.fileInput} type="file" accept="image/*" id={'self'}
                           onChange={handleChange('self')}/>
                    <label htmlFor={'self'} className={classes.uploadImageButton}>
                        {previews.self
                            ?
                            <div className={classes.uploadedImagePreview}>
                                <div className={classes.replaceImageIcon}>
                                    <img src={refreshImage} alt="tree preview"/>
                                </div>
                                <img className={classes.uploadedImage} src={previews.self} alt="tree preview"/>
                            </div>
                            :
                            <div className={classes.uploadBox}>
                                <img src={uploadImage} alt="tree preview"/>
                            </div>
                        }
                    </label>
                    <p className={'regular16'}>Автопортрет</p>
                </div>
            </div>
            <div className={classes.nextModule}>
                <p className={'bold14'} style={{color: '#A0A9B8'}}>Шаг {currentStep}/3</p>
                <SwitchButton
                    disabled={!(previews.tree && previews.animal && previews.self)}
                    onClick={uploadImageHandle}
                    theme={ButtonTheme.NEXT}
                    iconUrl={nextArrow}
                >
                    Далее
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 6L1 6M15 6L10 11M15 6L10 1" stroke="currentColor" stroke-opacity="1"
                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </SwitchButton>
            </div>
        </div>
    );
};

export default UploadImageStep;