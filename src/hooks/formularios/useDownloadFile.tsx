import { AxiosResponse } from "axios";
import { useRef, useState } from "react";

interface DownloadFileProps {
  readonly apiDefinition: (idForm: number) => Promise<AxiosResponse<Blob>>;
  readonly preDownloading: () => void;
  readonly postDownloading: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
}

interface DownloadedFileInfo {
  readonly download: (idForm: number) => Promise<void>;
  readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
  readonly name: string | undefined;
  readonly url: string | undefined;
}

export const useDownloadFile = ({
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  getFileName,
}: DownloadFileProps): DownloadedFileInfo => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();

  const download = async (idForm: number) => {
    try {
      preDownloading();
      const { data } = await apiDefinition(idForm);
      const url = URL.createObjectURL(new Blob([data]));
      setFileUrl(url);
      setFileName(getFileName());
      ref.current?.click();
      postDownloading();
      URL.revokeObjectURL(url);
    } catch (error) {
      onError();
    }
  };

  return { download, ref, url, name };
};