import * as rustCliForFileTransferFromAndroidToMac from "../routes/posts/adb-file-transfer-from-android-mac-using-rust.mdx";
import * as dontTossThatThinSoapSliver from "../routes/posts/dont-toss-that-thin-soap-sliver.mdx";
import * as md5sumInJs from "../routes/posts/md5sum-in-js.mdx";
import * as mosquitoBatUpgrade from "../routes/posts/mosquito-bat-upgrade.mdx";
import * as placeholdersForImages from "../routes/posts/placeholders-for-images.mdx";
import * as postureDetectionSystem from "../routes/posts/posture-detection-system.mdx";
import md5Image from "../assets/md5.png";
import mosquitoBatImage from "../assets/mosquitoBat.png";
import placeholderImage from "../assets/jumping-page.png";
import postureImage from "../assets/posture-sit-straight.png";

interface PostModule {
  filename: string;
  attributes: {
    meta: { title: string; description: string };
    date: string;
  };
}

function postFromModule(mod: PostModule, image?: string, imageAlt?: string) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
    date: mod.attributes.date,
    image,
    imageAlt,
  };
}

export const posts = [
  postFromModule(
    dontTossThatThinSoapSliver,
    "/social/soap-bar-wear.png",
    "Four soap bars becoming thinner with use"
  ),
  postFromModule(mosquitoBatUpgrade, mosquitoBatImage, "A handheld mosquito zapper"),
  postFromModule(rustCliForFileTransferFromAndroidToMac),
  postFromModule(
    postureDetectionSystem,
    postureImage,
    "Posture detection showing an upright sitting position"
  ),
  postFromModule(md5sumInJs, md5Image, "An example of MD5 hashing"),
  postFromModule(
    placeholdersForImages,
    placeholderImage,
    "A page shifting as images load"
  ),
];
