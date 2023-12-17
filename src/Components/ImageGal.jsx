import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../constant/BaseUrl';
import { Container, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone'


export const ImageGal = () => {
    const [droppedImages, setDroppedImages] = useState([]);
    const [droppedVideo, setdroppedVideo] = useState([]);
    const [droppedDoc, setdroppedDoc] = useState([])
    const [videoVisibility, setVideoVisibility] = useState(false)
    const [mediaData, setMediaData] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`${BaseUrl}pro/pro-media?id=${id}`)
                .then((response) => {
                    console.log(response.data);
                    setMediaData(response.data);
                    if (response.data.Video) {
                        setVideoVisibility(Array(response.data.Video.length).fill(false));
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            alert("yo yo mars")
        }

    }, [])


    const toggleVideoVisibility = (index) => {
        setVideoVisibility((prevVisibility) => {
            const updatedVisibility = [...prevVisibility];
            updatedVisibility[index] = !updatedVisibility[index];
            return updatedVisibility;
        });
        console.log(videoVisibility)
    };
    const handleDownload = (item) => {
        // Replace 'your_file_url' with the actual URL of the file you want to download
        const fileUrl = `${BaseUrl}media/${item}`;

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = fileUrl;

        // Set the download attribute with the desired filename
        link.download = 'downloaded_file.txt';

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger a click event on the link to initiate the download
        link.click();

        // Remove the link from the document body
        document.body.removeChild(link);
    };



    const onDrop1 = useCallback((acceptedFiles) => {
        const newImages = acceptedFiles.map(file => ({
            file,
            imageUrl: URL.createObjectURL(file),
        }));

        setDroppedImages(prevImages => [...prevImages, ...newImages]);
        console.log(droppedImages)
    }, []);

    const onDrop2 = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const videoUrl = URL.createObjectURL(file);
        setdroppedVideo({ file, videoUrl })
        console.log(droppedVideo)

    }, []);
    const onDrop3 = useCallback((acceptedFiles) => {
        const files = acceptedFiles.map(file => ({
            file,
            docUrl: URL.createObjectURL(file),
        }));

        setdroppedDoc(prevDoc => [...prevDoc, ...files]);
        console.log(droppedDoc);
    }, []);

    const { getRootProps: getRootProps1, getInputProps: getInputProps1, isDragActive: isDragActive1 } = useDropzone({
        accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
        maxFiles: 5,
        onDrop: onDrop1,
    })
    const { getRootProps: getRootProps2, getInputProps: getInputProps2, isDragActive: isDragActive2 } = useDropzone({

        accept: {
            "video/*": [".mp4", ".webm", ".ogg", ".mkv"],
        },
        maxFiles: 1,
        onDrop: onDrop2,
    })
    const { getRootProps: getRootProps3, getInputProps: getInputProps3, isDragActive: isDragActive3 } = useDropzone({
        maxFiles: 3,
        onDrop: onDrop3,
    })

    const handleDeleteImage = (index) => {
        const updatedImages = [...droppedImages];
        updatedImages.splice(index, 1);
        setDroppedImages(updatedImages);
    };


    const handleUpload = () => {
        if (droppedImages.length > 0) {
            const formData = new FormData();
            droppedImages.forEach(({ file }, index) => {
                formData.append(`image`, file);
            });
            axios.post(`${BaseUrl}pro/upd-media?id=${id}`, formData)
                .then((response) => {
                    if (response.data.status === 'Upload successful') {
                        alert('Upload successful');
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const handleUploadVideo = () => {
        if (droppedVideo.file) {
            const formData = new FormData();

            formData.append(`video`, droppedVideo.file);

            console.log(formData)
            axios.post(`${BaseUrl}pro/vid-doc?id=${id}&type=video`, formData)
                .then((response) => {
                    if (response.data.status === 'Upload successful') {
                        alert('Upload successful');
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const handleUploadDoc = () => {
        if (droppedDoc.length > 0) {
            const formData = new FormData();
            droppedDoc.forEach(({ file }, index) => {
                formData.append(`Doc`, file);
            });
            axios.post(`${BaseUrl}pro/vid-doc?id=${id}&type=Doc`, formData)
                .then((response) => {
                    if (response.data.status === 'Upload successful') {
                        alert('Upload successful');
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const handleDelete = (type) => {
        axios.get(`${BaseUrl}pro/dlt-media?id=${id}&type=${type}`)
            .then((response) => {
                if (response.data.status == 'deleted Sucessfully') {
                    alert('deleted Sucessfully');
                    window.location.reload();
                }
                else {
                    
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="home" title="View Media" className='tabView'>
                    <Container fluid >
                        <div className='imageView'>
                            <Row>
                                <div >
                                    <h3>Project Images</h3>
                                </div>
                            </Row>
                            <Row>
                                {mediaData.image ? (mediaData.image.map(([item], index) => (
                                    <Col key={index}>
                                        <img src={`${BaseUrl}media/${item}`} alt=""
                                            className='ProImg' />

                                    </Col>

                                ))) : mediaData.image === 0 ? <p>No Images Available for This Project</p> : null}

                                {mediaData.image != 0 && <><div ><button onClick={() => handleDelete('image')} className='btn'>Delete All</button></div></>}

                            </Row>
                        </div>
                        <div className="videoView">
                            <Row>
                                <div>
                                    <h3>Project Video</h3>
                                </div>
                            </Row>
                            <Row>

                                {mediaData.Video ? (mediaData.Video.map(([item], index) => (
                                    <Row key={index}>

                                        video {index + 1}<button className='btn' onClick={() => toggleVideoVisibility(index)}> {videoVisibility[index] ? 'hide' : 'show'}</button>



                                        {videoVisibility[index] &&
                                            <video width="50%" height="100%" controls>
                                                <source src={`${BaseUrl}media/${item}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>

                                        }


                                    </Row>

                                ))) : mediaData.Video === 0 ? <p>No Videos are Available for this Project</p> : null}
                                {mediaData.Video != 0 && <><div ><button onClick={() => handleDelete('video')} className='btn'>Delete All</button></div></>}
                            </Row>
                        </div>
                        <div className="fileView">
                            <Row>
                                <div>
                                    <h3>Project file</h3>
                                </div>
                            </Row>
                            <Row>
                                {mediaData.file ? (
                                    mediaData.file.map(([item], index) => (
                                        <div className="fileclass" key={index}>
                                            <Row key={index}>
                                                <p> *  file {index + 1}</p>
                                                <button className='btn' onClick={() => handleDownload(item)}>Download</button>
                                            </Row>
                                        </div>
                                    ))
                                ) : mediaData.file === 0 ? <p>No Files Available for this Project</p> : null}
                                {mediaData.file != 0 && <><div ><button onClick={() => handleDelete('doc')} className='btn'>Delete All</button></div></>}
                            </Row>
                        </div>
                    </Container>
                </Tab>
                <Tab eventKey="profile" title="Add Media">

                    <h1>Add Images</h1>
                    <div {...getRootProps1()} className={`dropzone ${isDragActive1 ? 'dragging' : ''}`}
                    >
                        <input {...getInputProps1()} />
                        {
                            isDragActive1 ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                        {droppedImages.map(({ imageUrl }, index) => (

                            <div key={index} className='Imagedrop'>
                                <img
                                    src={imageUrl}
                                    alt={`Uploaded  ${index + 1}`}
                                    style={{
                                        maxWidth: '90%',
                                        maxHeight: '200px',
                                        marginTop: '10px',
                                    }}
                                />
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        padding: '5px',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}
                                >
                                    X
                                </button>
                            </div>

                        ))}
                    </div>
                    <button onClick={handleUpload} className='btn'>Upload Images</button>


                    {/* -------------------------------------------------------------- */}

                    <h1>Add Video</h1>
                    <div {...getRootProps2()} className={`dropzone ${isDragActive2 ? 'dragging' : ''}`}
                    >
                        <input {...getInputProps2()} />
                        {
                            isDragActive2 ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                        {droppedVideo.file ? <p> video uploaded</p> : null}
                    </div>
                    <button onClick={handleUploadVideo} className='btn'>Upload Video</button>

                    {/* ---------------------------------------------------- */}
                    <h1>Add Docs</h1>
                    <div {...getRootProps3()} className={`dropzone ${isDragActive3 ? 'dragging' : ''}`}
                    >
                        <input {...getInputProps3()} />
                        {
                            isDragActive3 ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                        {droppedDoc.length > 0 ? <p>{droppedDoc.length} file added</p> : null}
                    </div>
                    <button onClick={handleUploadDoc} className='btn'>Upload Doc</button>
                </Tab>

            </Tabs>
        </>
    )
}
