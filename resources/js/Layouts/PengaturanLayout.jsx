import "/resources/css/main.css";
import { Head, router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import DashboardNavbarItem from "@/Components/DashboardNavbarItem";
import ButtonPill from "@/Components/ButtonPill";
import MainHeader from "./Partials/MainHeader";
import wave7 from "/resources/img/vector/wave-7.svg";
import userIcon from "/resources/img/icon/user.png";
import "@/script/mainHeader";

export default function UserLayout({ auth, title, children }) {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : userIcon
    );
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title="Dashboard" />
            <main className="text-dark pt-20 xs:pt-20 md:pt-20 xl:pt-32 3xl:pt-48 pb-[8vw] md:pb-[3vw] text-[3vw] md:text-[1.15vw] overflow-visible">
                <Preliminary
                    auth={auth}
                    title={title}
                    profileImage={profileImage}
                    setShowImageUploader={setShowImageUploader}
                />
                <DashboardContent
                    auth={auth}
                    title={title}
                    profileImage={profileImage}
                    setShowImageUploader={setShowImageUploader}
                >
                    {children}
                </DashboardContent>
                <ImageUploader
                    show={showImageUploader}
                    setShow={setShowImageUploader}
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                />
            </main>
        </>
    );
}

function Preliminary({ auth, title, profileImage, setShowImageUploader }) {
    return (
        <div
            className={`md:hidden container mx-auto shadow-centered-spread rounded-[1vw] overflow-hidden mt-[3vw] mb-[6vw] md:mb-[3vw] ${
                title == "Pengaturan" ? "" : "hidden"
            }`}
        >
            <div className="relative flex flex-col md:flex-row text-center md:text-left items-center gap-[3vw] md:gap-[1.5vw] p-[6vw] pb-[12vw] md:p-[3vw]">
                <img
                    className="w-[22vw] h-[22vw] md:w-[6vw] md:h-[6vw] rounded-full"
                    src={profileImage ? profileImage : userIcon}
                    alt="User"
                />
                <div>
                    <h2 className="font-sans font-medium text-[4vw] md:text-[2.25vw] mb-[5vw]">
                        Selamat Datang{" "}
                        <span className="text-secondary">{auth.user.name}</span>
                    </h2>
                    <span
                        className="bg-secondary text-white rounded-[1vw] py-[.75vw] px-[2.5vw] text-[2.75vw]"
                        onClick={() => setShowImageUploader(true)}
                    >
                        <i className="bi bi-pen"></i> Ubah Foto
                    </span>
                </div>
                <img
                    src={wave7}
                    className="absolute w-full left-0 right-0 bottom-0 select-none"
                />
            </div>
        </div>
    );
}

function DashboardContent({
    auth,
    title,
    profileImage,
    setShowImageUploader,
    children,
}) {
    return (
        <div className="container mx-auto flex gap-[3vw] md:mt-[3vw]">
            <DashboardNavbar
                auth={auth}
                className={`sticky top-24 xs:top-28 md:top-24 xl:top-28 3xl:top-40 z-10 w-full md:w-3/12 h-fit ${
                    title == "Pengaturan" ? "" : "hidden md:flex"
                }`}
                title={title}
                profileImage={profileImage}
                setShowImageUploader={setShowImageUploader}
            />
            <div
                className={`w-full md:w-9/12 h-fit md:p-[2.5vw] md:shadow-centered-spread md:rounded-md ${
                    title == "Pengaturan" ? "hidden md:block" : ""
                }`}
            >
                <div className="text-center mb-[6vw] md:mb-[2vw]">
                    <h1 className="md:font-medium text-secondary text-[4vw] md:text-[2vw] leading-[12vw] md:leading-[4vw]">
                        {title == "Pengaturan" ? "Ubah Profil" : title}
                    </h1>
                    <hr className="border-1 border-secondary" />
                </div>
                {children}
            </div>
        </div>
    );
}

function DashboardNavbar({
    auth,
    title,
    profileImage,
    setShowImageUploader,
    className,
}) {
    return (
        <div
            className={`flex flex-col gap-[5.5vw] md:gap-[1.5vw] ${className}`}
        >
            <div className="hidden md:flex items-center gap-[1vw]">
                <img
                    className="w-[22vw] h-[22vw] md:w-[5vw] md:h-[5vw] rounded-full shadow-centered-spread"
                    src={profileImage ? profileImage : userIcon}
                    alt="User"
                />
                <div>
                    <p className="font-medium">{auth.user.username}</p>
                    <button
                        className="text-[.95vw] font-medium hover:text-secondary"
                        onClick={() => setShowImageUploader(true)}
                    >
                        <i className="bi bi-pen"></i> Ubah Foto
                    </button>
                </div>
            </div>
            <DashboardNavbarItem
                className={`${
                    title == "Pengaturan" ? "hidden md:inline-block" : ""
                }`}
                href="/pengaturan/ubah_profil"
                active={title == "Pengaturan" || title == "Ubah Profil"}
            >
                <i className="bi bi-pen"></i>
                <span>Profil</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem
                className="md:hidden"
                href="/pengaturan/ubah_profil"
                active={false}
            >
                <i className="bi bi-pen"></i>
                <span>Profil</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem
                href="/pengaturan/ubah_password"
                active={title == "Ubah Password"}
            >
                <i className="bi bi-key"></i>
                <span>Ubah Password</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem
                href="/logout"
                method="post"
                active={title == "Keluar"}
            >
                <i className="bi bi-box-arrow-right"></i>
                <span>Keluar</span>
            </DashboardNavbarItem>
        </div>
    );
}

function ImageUploader({ show, setShow, profileImage, setProfileImage }) {
    const [tempImage, setTempImage] = useState(profileImage);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [tempAreaPixels, setTempAreaPixels] = useState("");

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setTempAreaPixels(croppedAreaPixels);
    }, []);

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                () => resolve(reader.result),
                false
            );
            reader.readAsDataURL(file);
        });
    };

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await readFile(file);
            setTempImage(imageDataUrl);
        }
    };

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    const rotateSize = (width, height, rotation) => {
        const rotRad = getRadianAngle(rotation);

        return {
            width:
                Math.abs(Math.cos(rotRad) * width) +
                Math.abs(Math.sin(rotRad) * height),
            height:
                Math.abs(Math.sin(rotRad) * width) +
                Math.abs(Math.cos(rotRad) * height),
        };
    };

    const getRadianAngle = (degreeValue) => {
        return (degreeValue * Math.PI) / 180;
    };

    const getCroppedImg = async (
        imageSrc,
        pixelCrop,
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        const rotRad = getRadianAngle(rotation);

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        );

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth;
        canvas.height = bBoxHeight;

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
        ctx.rotate(rotRad);
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
        ctx.translate(-image.width / 2, -image.height / 2);

        // draw rotated image
        ctx.drawImage(image, 0, 0);

        const croppedCanvas = document.createElement("canvas");

        const croppedCtx = croppedCanvas.getContext("2d");

        if (!croppedCtx) {
            return null;
        }

        // Set the size of the cropped canvas
        croppedCanvas.width = pixelCrop.width;
        croppedCanvas.height = pixelCrop.height;

        // Draw the cropped image onto the new canvas
        croppedCtx.drawImage(
            canvas,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        var scaledCanvas = document.createElement("canvas"); //off-screen canvas

        scaledCanvas.width = 256; //size of new canvas, make sure they are proportional
        scaledCanvas.height = 256; //compared to original canvas

        // scale original image to new canvas
        var scaledCtx = scaledCanvas.getContext("2d");
        scaledCtx.drawImage(
            croppedCanvas,
            0,
            0,
            scaledCanvas.width,
            scaledCanvas.height
        );

        // As Base64 string
        return scaledCanvas.toDataURL("image/jpeg");

        // As a blob
        // return new Promise((resolve, reject) => {
        //     croppedCanvas.toBlob((file) => {
        //         resolve(URL.createObjectURL(file))
        //     }, 'image/jpeg')
        // })
    };

    const imageSubmit = async () => {
        try {
            const croppedImage = await getCroppedImg(tempImage, tempAreaPixels);
            setProfileImage(croppedImage);
            // post croppedImage here
            router.post("/profile_image", { image: croppedImage });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => setShow(false)}
            ></div>
            <div
                className={`${
                    show ? "md:top-0 bottom-0" : "md:top-full -bottom-full"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] h-[60vh] md:h-[30vw] transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-secondary font-poppins font-bold text-[4.5vw] md:text-[1.2vw]">
                            Ubah Foto
                        </h5>
                        <i
                            role="button"
                            className={
                                "fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            }
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div className="relative w-full h-full">
                    <Cropper
                        image={tempImage}
                        crop={crop}
                        cropShape="round"
                        showGrid={false}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="flex flex-wrap justify-end gap-[2vw] md:gap-[1vw] mt-[1vw]">
                    <label className="w-3/12" htmlFor="profile_photo">
                        <ButtonPill className="w-full">Upload</ButtonPill>
                    </label>
                    <input
                        className="hidden"
                        type="file"
                        id="profile_photo"
                        accept="image/*"
                        onChange={onFileChange}
                    />
                    <ButtonPill
                        className="w-3/12"
                        onClick={() => {
                            imageSubmit();
                            setShow(false);
                        }}
                    >
                        Simpan
                    </ButtonPill>
                </div>
            </div>
        </>
    );
}
