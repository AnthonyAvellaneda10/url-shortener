import QRCode from 'react-qr-code';

interface QRCodeProps {
    value: string
  }

export const QRCodeGenerate = ({ value }: QRCodeProps) => {
    return (
        <div className="flex">
          <QRCode
            value={value}
            size={48}
            // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
          />
        </div>
      )
}
