'use client';

import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { commands, commissionTypes, lgasByState, ranks, states } from '../lib/constants';
import { saveDraft, loadDraft, clearDraft } from '../lib/storage';
import { FormNavigation } from '../components/FormNavigation';
import { SignaturePad } from '../components/SignaturePad';
import { loadReport, saveReport, type SaveReportPayload } from '../lib/api';

const formSchema = z.object({
  bio: z.object({
    surname: z.string().min(1),
    firstName: z.string().min(1),
    rank: z.string().min(1),
    serviceNumber: z.string().min(1),
    commission: z.string().min(1),
    command: z.string().min(1),
    unit: z.string().min(1),
    state: z.string().min(1),
    lga: z.string().min(1)
  }),
  appointments: z.object({
    present: z.string().min(1),
    previous: z.string().min(1),
    dateOfCommission: z.string().min(1),
    dateOfBirth: z.string().min(1)
  }),
  conduct: z.object({
    discipline: z.string().min(1),
    leadership: z.string().min(1),
    teamwork: z.string().min(1)
  }),
  professional: z.object({
    knowledge: z.string().min(1),
    initiative: z.string().min(1),
    efficiency: z.string().min(1)
  }),
  reviewer: z.object({
    remarks: z.string().min(1),
    signature: z.string().min(1),
    signedAt: z.string().min(1)
  }),
  reporting: z.object({
    remarks: z.string().min(1),
    signature: z.string().min(1),
    signedAt: z.string().min(1)
  }),
  commanding: z.object({
    approval: z.string().min(1),
    signature: z.string().min(1),
    signedAt: z.string().min(1)
  })
});

const totalPages = 7;

type FormData = z.infer<typeof formSchema>;
type PersistedPayload = {
  form: FormData;
  page: number;
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [shareUrl, setShareUrl] = useState<string>('');
  const searchParams = useSearchParams();
  const formId = searchParams.get('formId');

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      bio: {
        surname: '',
        firstName: '',
        rank: ranks[0],
        serviceNumber: '',
        commission: commissionTypes[0],
        command: Object.keys(commands)[0],
        unit: commands[Object.keys(commands)[0]][0],
        state: states[0],
        lga: ''
      },
      appointments: { present: '', previous: '', dateOfCommission: '', dateOfBirth: '' },
      conduct: { discipline: '', leadership: '', teamwork: '' },
      professional: { knowledge: '', initiative: '', efficiency: '' },
      reviewer: { remarks: '', signature: '', signedAt: '' },
      reporting: { remarks: '', signature: '', signedAt: '' },
      commanding: { approval: '', signature: '', signedAt: '' }
    }
  });

  const { handleSubmit, watch, reset, trigger } = methods;
  const watchAll = watch();
  const saveMutation = useMutation({
    mutationFn: (payload: SaveReportPayload<PersistedPayload>) => saveReport(payload)
  });
  const { data: remoteReport } = useQuery({
    queryKey: ['report', formId],
    queryFn: () => loadReport(formId as string),
    enabled: Boolean(formId),
    staleTime: 30_000
  });

  useEffect(() => {
    if (formId) return;
    const draft = loadDraft<FormData>();
    if (draft?.data) {
      reset(draft.data);
      setPage(draft.page ?? 0);
    }
  }, [formId, reset]);

  useEffect(() => {
    if (!formId || !remoteReport?.data) return;
    const payload = remoteReport.data as PersistedPayload | FormData;
    const form = 'form' in payload ? payload.form : payload;
    const persistedPage = 'page' in payload ? payload.page : 0;
    reset(form);
    setPage(persistedPage);
    setShareUrl(`${window.location.origin}?formId=${formId}`);
  }, [formId, remoteReport, reset]);

  useEffect(() => {
    saveDraft(watchAll, page);
  }, [watchAll, page]);

  const units = useMemo(() => commands[watchAll.bio.command as keyof typeof commands] || [], [watchAll.bio.command]);
  const lgas = useMemo(() => lgasByState[watchAll.bio.state] || [], [watchAll.bio.state]);

  const goNext = async () => {
    const pageValid = await trigger(getFieldsForPage(page));
    if (!pageValid) return;
    if (page === totalPages - 1) {
      handleSubmit(onSubmit)();
      return;
    }
    setPage((p) => Math.min(totalPages - 1, p + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    setPage((p) => Math.max(0, p - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: FormData) => {
    const result = await saveMutation.mutateAsync({
      data: {
        form: data,
        page
      },
      savedAt: new Date().toISOString()
    });
    const url = `${window.location.origin}?formId=${result.id}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).catch(() => {});
    clearDraft();
    alert('Saved! Share link copied to clipboard.');
  };

  const handleSignature = (target: 'reviewer' | 'reporting' | 'commanding') => (dataUrl: string, signedAt: string) => {
    methods.setValue(`${target}.signature` as any, dataUrl, { shouldValidate: true });
    methods.setValue(`${target}.signedAt` as any, signedAt, { shouldValidate: true });
  };

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">PER FORM 206</p>
                <h1 className="text-2xl font-bold">Nigerian Navy Performance Evaluation Report</h1>
              </div>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 1/7</span>
            </header>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Surname" name="bio.surname" />
              <Field label="First Name" name="bio.firstName" />
              <Select label="Rank" name="bio.rank" options={ranks} />
              <Field label="Service Number" name="bio.serviceNumber" />
              <Select label="Commission" name="bio.commission" options={commissionTypes} />
              <Select label="Command" name="bio.command" options={Object.keys(commands)} />
              <Select label="Unit" name="bio.unit" options={units} />
              <Select label="State" name="bio.state" options={states} />
              <Select label="LGA" name="bio.lga" options={lgas} placeholder="Select LGA" />
            </div>
          </section>
        );
      case 1:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Appointments</h2>
              </div>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 2/7</span>
            </header>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Present Appointment" name="appointments.present" />
              <Field label="Previous Appointment" name="appointments.previous" />
              <Field label="Date of Commission" name="appointments.dateOfCommission" type="date" />
              <Field label="Date of Birth" name="appointments.dateOfBirth" type="date" />
            </div>
          </section>
        );
      case 2:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Conduct Assessment</h2>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 3/7</span>
            </header>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Discipline" name="conduct.discipline" />
              <Field label="Leadership" name="conduct.leadership" />
              <Field label="Teamwork" name="conduct.teamwork" />
            </div>
          </section>
        );
      case 3:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Professional Performance</h2>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 4/7</span>
            </header>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Professional Knowledge" name="professional.knowledge" />
              <Field label="Initiative" name="professional.initiative" />
              <Field label="Efficiency" name="professional.efficiency" />
            </div>
          </section>
        );
      case 4:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">1st Reporting Officer</h2>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 5/7</span>
            </header>
            <div className="space-y-3">
              <TextArea label="Remarks" name="reviewer.remarks" />
              <SignaturePad value={watchAll.reviewer.signature} onChange={handleSignature('reviewer')} />
            </div>
          </section>
        );
      case 5:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">2nd Reporting Officer</h2>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 6/7</span>
            </header>
            <div className="space-y-3">
              <TextArea label="Remarks" name="reporting.remarks" />
              <SignaturePad value={watchAll.reporting.signature} onChange={handleSignature('reporting')} />
            </div>
          </section>
        );
      case 6:
        return (
          <section className="section-card p-6 space-y-4">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Commanding Officer / Commander</h2>
              <span className="px-3 py-1 bg-navy-500 text-white rounded-md">Page 7/7</span>
            </header>
            <div className="space-y-3">
              <TextArea label="Approval & Recommendations" name="commanding.approval" />
              <SignaturePad value={watchAll.commanding.signature} onChange={handleSignature('commanding')} />
              {shareUrl && (
                <div className="p-3 rounded-md bg-navy-50 border border-navy-500/30">
                  <p className="font-semibold">Share link</p>
                  <p className="text-sm text-gray-700">{shareUrl}</p>
                </div>
              )}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {renderPage()}
        <FormNavigation
          totalPages={totalPages}
          currentPage={page}
          onPrev={goPrev}
          onNext={goNext}
          isLast={page === totalPages - 1}
          disableNext={!methods.formState.isValid && methods.formState.isSubmitted}
        />
      </form>
    </FormProvider>
  );
}

function Field({ label, name, type = 'text' }: { label: string; name: any; type?: string }) {
  const { register, formState } = useFormContext();
  const error = formState.errors as any;
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input type={type} {...register(name)} className="w-full" />
      {error?.[name.split('.')[0]]?.[name.split('.')[1]] && (
        <span className="text-red-600 text-xs">Required</span>
      )}
    </label>
  );
}

function Select({ label, name, options, placeholder }: { label: string; name: any; options: string[]; placeholder?: string }) {
  const { register, watch } = useFormContext();
  const value = watch(name);
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <select {...register(name)} value={value} className="w-full">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name }: { label: string; name: any }) {
  const { register, formState } = useFormContext();
  const error = formState.errors as any;
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <textarea {...register(name)} rows={4} />
      {error?.[name.split('.')[0]]?.[name.split('.')[1]] && (
        <span className="text-red-600 text-xs">Required</span>
      )}
    </label>
  );
}

function getFieldsForPage(page: number) {
  switch (page) {
    case 0:
      return [
        'bio.surname',
        'bio.firstName',
        'bio.rank',
        'bio.serviceNumber',
        'bio.commission',
        'bio.command',
        'bio.unit',
        'bio.state',
        'bio.lga'
      ];
    case 1:
      return ['appointments.present', 'appointments.previous', 'appointments.dateOfCommission', 'appointments.dateOfBirth'];
    case 2:
      return ['conduct.discipline', 'conduct.leadership', 'conduct.teamwork'];
    case 3:
      return ['professional.knowledge', 'professional.initiative', 'professional.efficiency'];
    case 4:
      return ['reviewer.remarks', 'reviewer.signature', 'reviewer.signedAt'];
    case 5:
      return ['reporting.remarks', 'reporting.signature', 'reporting.signedAt'];
    case 6:
      return ['commanding.approval', 'commanding.signature', 'commanding.signedAt'];
    default:
      return [];
  }
}
