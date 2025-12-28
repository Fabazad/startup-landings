"use client";

import { Controller, useFormContext } from 'react-hook-form';

import FormHelperText from '@mui/material/FormHelperText';

import { Upload, UploadBox, UploadAvatar } from '../upload';

import type { UploadProps } from '../upload';
import { Typography } from '@mui/material';
import { fData } from 'src/utils/format-number';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Props = UploadProps & {
  name: string;
};

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }: Props) {
  const { control, setValue } = useFormContext();

  const { t } = useTranslate();

  const helperText = other.helperText || (
    <Typography
      variant="caption"
      sx={{
        mt: 3,
        mx: 'auto',
        display: 'block',
        textAlign: 'center',
        color: 'text.disabled',
      }}
    >
      {t("upload.accepted")}
      <br /> {t("upload.max-size")} {fData(3145728)}
    </Typography>
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onDrop = (acceptedFiles: File[]) => {
          const value = acceptedFiles[0];

          setValue(name, value, { shouldValidate: true });
        };

        return (
          <div>
            <UploadAvatar value={field.value} error={!!error} onDrop={onDrop} {...other} helperText={helperText} />

            {!!error && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox value={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadImage({ name, multiple, helperText, onChange, ...other }: Props & { onChange?: (file?: File) => void }) {
  const { control, setValue } = useFormContext();
  const { t } = useTranslate();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const uploadProps = {
          multiple,
          accept: { 'image/*': [] },
          error: !!error,
        };

        const onDrop = (acceptedFiles: File[]) => {
          const value = multiple ? [...field.value, ...acceptedFiles] : acceptedFiles[0];
          setValue(name, value, { shouldValidate: true });
          onChange?.(value as File);
        };

        const onDelete = () => {
          setValue(name, undefined, { shouldValidate: true });
          onChange?.(undefined);
        };

        const helperText = (
          <Typography
            variant="caption"
            sx={{
              mt: 3,
              mx: 'auto',
              display: 'block',
              textAlign: 'center',
              color: 'text.disabled',
            }}
          >
            {t("upload.accepted")}
            <br /> {t("upload.max-size")} {fData(3145728)}
          </Typography>
        )

        return <Upload {...uploadProps} helperText={helperText} value={field.value} onDrop={onDrop} onDelete={onDelete} {...other} />;
      }}
    />
  );
}
