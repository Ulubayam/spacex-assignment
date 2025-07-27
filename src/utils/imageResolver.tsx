import type { LaunchChartData } from "../types/spacex";

export const imageResolver = (launch: LaunchChartData): string => {
    if (Array.isArray(launch.links?.flickr_images) && launch.links.flickr_images.length > 0) {
        const flickrUrl = launch.links.flickr_images[0];
        if (flickrUrl && (flickrUrl.startsWith('http') || flickrUrl.startsWith('data:image'))) {
            return flickrUrl;
        }
    }

    if (launch.links?.mission_patch_small) {
        const url = launch.links.mission_patch_small;
        if (url.startsWith('http') || url.startsWith('data:image')) {
            return url;
        }
    }

    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSAxNGMwIDIuMjEtMy41ODIgNC04IDRzLTgtMS43OS04LTRzMy41ODItNCA4LTRzOCAxLjc5IDggNHoiLz48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMTAwLTQgMiAyIDAgMDAwIDR6Ii8+PC9zdmc+';
};