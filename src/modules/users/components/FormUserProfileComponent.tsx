import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IRoleWrapper } from '../../../models/common';
import { IParamsUserInfo } from '../../../models/user';
import { SelectOption } from '../../../models/utils/input';
import { AppState } from '../../../redux/reducer';
import { validEmailRegex } from '../../../utils';
import Checkbox from '../../common/components/input/Checkbox';
import InputComponent from '../../common/components/input/InputComponent';
import InputFormLayout from '../../common/components/input/InputFormLayout';
import MultiSelectionCheckboxComponent from '../../common/components/input/MultiSelectionCheckboxComponent';
import SelectionComponent from '../../common/components/input/SelectionComponent';
import TextareaComponent from '../../common/components/input/TextareaComponent';

interface Props {
  userInfo: IParamsUserInfo;
  onSubmitable(changeTo: boolean): void;
  onSubmit?(userInfo: IParamsUserInfo): void;
  triggerSubmitFlag?: boolean;
  setSubmitFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  detailForm?: boolean;
}

const FormUserProfileComponent = (props: Props) => {
  const { userInfo, onSubmitable, onSubmit, triggerSubmitFlag, detailForm, setSubmitFlag } = props;
  const roles = useSelector<AppState, IRoleWrapper>((state) => state.common.roles);
  const {
    watch,
    control,
    getValues,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm<IParamsUserInfo>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: userInfo,
    shouldUnregister: true,
  });

  useEffect(() => {
    // check error
    if (errors.firstName || errors.lastName || errors.email || errors.password || errors.confirm_password) {
      onSubmitable(false);
      return;
    }

    // for update
    if (detailForm) {
      if (Object.keys(dirtyFields).length) {
        onSubmitable(true);
      } else {
        onSubmitable(false);
      }
      return;
    }
    // for create
    // check dirtyFields for case when user input all valid in first try
    if (
      !dirtyFields.firstName ||
      !dirtyFields.lastName ||
      !dirtyFields.email ||
      !dirtyFields.password ||
      !dirtyFields.confirm_password
    ) {
      onSubmitable(false);
      return;
    }
    onSubmitable(true);
  }, [
    onSubmitable,
    dirtyFields,
    detailForm,
    dirtyFields.firstName,
    dirtyFields.lastName,
    dirtyFields.email,
    dirtyFields.password,
    dirtyFields.confirm_password,
    dirtyFields.statusComment,
    dirtyFields.roles,
    errors.firstName,
    errors.lastName,
    errors.email,
    errors.password,
    errors.confirm_password,
  ]);

  const typeOptions: SelectOption[] = useMemo(
    () => [
      { label: 'Bussiness', value: 'business' },
      { label: 'Individual', value: 'individual' },
    ],
    [],
  );

  const accessLevelOptions: SelectOption[] = useMemo(
    () => [
      { label: 'Admin', value: '100' },
      { label: 'Vendor', value: '10' },
    ],
    [],
  );
  const watchAccessLevel = watch('access_level');

  const roleOptions: SelectOption[] = useMemo(() => {
    if (roles.administrator) {
      return roles.administrator.map((role) => ({ label: role.name, value: role.id }));
    }
    return [];
  }, [roles]);

  const memberShipOptions: SelectOption[] = useMemo(
    () => [
      { label: 'General', value: '4' },
      { label: 'Ignore Membership', value: '' },
    ],
    [],
  );

  const userStatusOptions: SelectOption[] = useMemo(
    () => [
      { label: 'Enabled', value: 'E' },
      { label: 'Disabled', value: 'D' },
      { label: 'Unapproved Vendor', value: 'U' },
    ],
    [],
  );

  const handleChangeUserInfo = useCallback((data) => onSubmit && onSubmit(data), [onSubmit]);

  useEffect(() => {
    if (triggerSubmitFlag) {
      handleSubmit(handleChangeUserInfo, () => setSubmitFlag && setSubmitFlag(false))();
    }
  }, [triggerSubmitFlag, handleChangeUserInfo, handleSubmit, setSubmitFlag]);

  return (
    <form onSubmit={handleSubmit(handleChangeUserInfo)}>
      <div className="mx-10 ">
        <div className="text-xl">Email & password</div>
        <div className="space-y-3 pt-4 pb-10 ">
          <InputFormLayout title="First name" required error={errors.firstName?.message}>
            <Controller
              name="firstName"
              rules={{ required: 'First Name is required' }}
              control={control}
              render={({ field }) => (
                <InputComponent onBlur={field.onBlur} value={field.value} onChange={field.onChange} />
              )}
            />
          </InputFormLayout>
          <InputFormLayout title="First name" required error={errors.lastName?.message}>
            <Controller
              name="lastName"
              rules={{ required: 'Last Name is required' }}
              control={control}
              render={({ field }) => (
                <InputComponent onBlur={field.onBlur} value={field.value} onChange={field.onChange} />
              )}
            />
          </InputFormLayout>
          <InputFormLayout title="Email" required error={errors.email?.message}>
            <Controller
              name="email"
              rules={{
                required: 'Email is required',
                pattern: { value: validEmailRegex, message: 'Email is not valid' },
              }}
              control={control}
              render={({ field }) => (
                <InputComponent onBlur={field.onBlur} value={field.value} onChange={field.onChange} />
              )}
            />
          </InputFormLayout>
          <InputFormLayout title="Password" required={!detailForm} error={errors.password?.message}>
            <Controller
              name="password"
              rules={
                !detailForm
                  ? {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password at least 6 characters' },
                    }
                  : {}
              }
              control={control}
              render={({ field }) => (
                <InputComponent onBlur={field.onBlur} hidden value={field.value} onChange={field.onChange} />
              )}
            />
          </InputFormLayout>
          <InputFormLayout title="Confirm password" required={!detailForm} error={errors.confirm_password?.message}>
            <Controller
              name="confirm_password"
              rules={{
                required: !detailForm ? 'Confirm password is required' : undefined,
                validate: (value) => value == getValues('password') || 'Password not match',
              }}
              control={control}
              render={({ field }) => (
                <InputComponent onBlur={field.onBlur} hidden value={field.value} onChange={field.onChange} />
              )}
            />
          </InputFormLayout>
          <InputFormLayout title="Type">
            {!detailForm && (
              <Controller
                name="paymentRailsType"
                control={control}
                render={({ field }) => (
                  <SelectionComponent
                    title="Individual"
                    list={typeOptions}
                    selectedValue={field.value!}
                    onChange={field.onChange}
                  />
                )}
              />
            )}
          </InputFormLayout>
          <InputFormLayout title="PaymenRail ID">
            <></>
          </InputFormLayout>
        </div>
      </div>
      <div className="h-5 bg-primary"></div>
      <div className="mx-10 my-4">
        <div className="text-xl">Access information</div>
        <div className="space-y-10 py-4">
          <InputFormLayout title="Access level" required={!detailForm}>
            {!detailForm ? (
              <Controller
                name={'access_level'}
                control={control}
                render={({ field }) => (
                  <SelectionComponent
                    title="Vendor"
                    list={accessLevelOptions}
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : (
              <>{userInfo.access_level == '10' ? 'Vendor' : 'Admin'}</>
            )}
          </InputFormLayout>
          {(watchAccessLevel == '100' || userInfo.access_level == '100') && (
            <InputFormLayout title="Roles" required>
              <Controller
                name={'roles'}
                control={control}
                render={({ field }) => (
                  <MultiSelectionCheckboxComponent
                    list={roleOptions}
                    selectedValues={field.value!}
                    onChange={field.onChange}
                    title="Select roles"
                  />
                )}
              />
            </InputFormLayout>
          )}
          {detailForm && (
            <InputFormLayout title="Status comment (reason)" lg>
              <Controller
                name={'statusComment'}
                control={control}
                render={({ field }) => (
                  <TextareaComponent onChange={field.onChange} value={field.value} onBlur={field.onBlur} />
                )}
              />
            </InputFormLayout>
          )}
          {detailForm && (
            <InputFormLayout title="Account status" required>
              <Controller
                name={'status'}
                control={control}
                render={({ field }) => (
                  <SelectionComponent
                    title="Status"
                    list={userStatusOptions}
                    selectedValue={field.value!}
                    onChange={field.onChange}
                  />
                )}
              />
            </InputFormLayout>
          )}
          <InputFormLayout title="Membership">
            <Controller
              name={'membership_id'}
              control={control}
              render={({ field }) => (
                <SelectionComponent
                  title="Ignore Membership"
                  list={memberShipOptions}
                  selectedValue={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </InputFormLayout>
          {detailForm && (
            <InputFormLayout title="Pending membership">
              {userInfo.pending_membership_id || 'none'}
            </InputFormLayout>
          )}
          <InputFormLayout title="Rquire to change password on next login">
            <Controller
              name={'forceChangePassword'}
              control={control}
              render={({ field }) => (
                <div className="flex h-full items-center">
                  <Checkbox white value={!!field.value} onChange={(changeTo) => field.onChange(changeTo ? 1 : 0)} />
                </div>
              )}
            />
          </InputFormLayout>
        </div>
      </div>
      <div className="h-5 bg-primary"></div>
      <div className="mx-10 my-4">
        <div className="text-xl">Tax information</div>
        <div className="py-4">
          <InputFormLayout title="Tax exempt">
            <Controller
              name={'taxExempt'}
              control={control}
              render={({ field }) => (
                <div className="flex h-full items-end">
                  <Checkbox white value={!!field.value} onChange={(changeTo) => field.onChange(changeTo ? 1 : 0)} />
                </div>
              )}
            />
          </InputFormLayout>
        </div>
      </div>
      <input type="submit" hidden />
    </form>
  );
};

export default React.memo(FormUserProfileComponent);
