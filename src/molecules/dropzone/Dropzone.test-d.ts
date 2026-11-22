import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type { DropzoneProps } from './Dropzone';

describe('DropzoneProps', () => {
  test('requires files and onFilesChange, as the dropzone is controlled', () => {
    expectTypeOf<DropzoneProps['files']>().toEqualTypeOf<readonly File[]>();
    expectTypeOf<DropzoneProps['onFilesChange']>().toEqualTypeOf<
      (files: File[]) => void
    >();
  });

  test('takes the setter of a state as onFilesChange', () => {
    expectTypeOf<Dispatch<SetStateAction<File[]>>>().toExtend<
      DropzoneProps['onFilesChange']
    >();
  });

  test('requires the content of the zone and of the remove buttons', () => {
    expectTypeOf<DropzoneProps['children']>().toEqualTypeOf<ReactNode>();
    expectTypeOf<DropzoneProps['removeLabel']>().toEqualTypeOf<
      (file: File) => ReactNode
    >();
  });

  test('leaves out the drag handlers which the zone needs for itself', () => {
    expectTypeOf<DropzoneProps>().not.toHaveProperty('onDrop');
    expectTypeOf<DropzoneProps>().not.toHaveProperty('onDragOver');
  });

  test('leaves out the props which would point the zone at another control', () => {
    expectTypeOf<DropzoneProps>().not.toHaveProperty('htmlFor');
    expectTypeOf<DropzoneProps>().not.toHaveProperty('form');
  });
});
