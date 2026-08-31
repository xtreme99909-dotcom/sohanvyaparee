import Image from 'next/image';

export function FounderAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'founder-avatar compact' : 'founder-avatar'} aria-hidden="true">
      <Image
        src="/founder-avatar.png"
        alt=""
        width={compact ? 34 : 48}
        height={compact ? 34 : 48}
        sizes={compact ? '34px' : '48px'}
      />
    </span>
  );
}
