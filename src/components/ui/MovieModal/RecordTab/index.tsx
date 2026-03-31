import { useState } from "react"
import styles from "./index.module.css"
import clsx from "clsx"
import { toast } from "sonner"

type MovieRecord = {
  movieId: string
  rating: number
  watchedDate: string
  comment: string
  createdAt: string
}

type Props = {
  movieId: string
}

const getRecord = (movieId: string): MovieRecord | null => {
  try {
    const data: MovieRecord[] = JSON.parse(localStorage.getItem("movieRecords") ?? "[]")
    return data.find(r => r.movieId === movieId) ?? null
  } catch { return null }
}

const RecordTab = ({ movieId }: Props) => {
  const record = getRecord(movieId)
  const [existingRecord, setExistingRecord] = useState<MovieRecord | null>(record)
  const [rating, setRating] = useState<number>(record?.rating ?? 0)
  const [watchedDate, setWatchedDate] = useState<string>(record?.watchedDate ?? new Date().toISOString().slice(0, 10))
  const [comment, setComment] = useState<string>(record?.comment ?? "")
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveRecords = () => {
    if (rating === 0) {
      toast.error("評価を選んでください")
      return
    }
    const newRecord: MovieRecord = {
      movieId, rating, watchedDate, comment,
      createdAt: existingRecord?.createdAt ?? new Date().toISOString(),
    }
    const existing: MovieRecord[] = JSON.parse(localStorage.getItem("movieRecords") ?? "[]")
    const filtered = existing.filter(r => r.movieId !== movieId)
    localStorage.setItem("movieRecords", JSON.stringify([newRecord, ...filtered]))
    setExistingRecord(newRecord)
    setIsEditing(false)
    toast.success("登録しました！")
  }

  const handleCancel = () => {
    // existingRecordの値に戻す
    setRating(existingRecord?.rating ?? 0)
    setWatchedDate(existingRecord?.watchedDate ?? new Date().toISOString().slice(0, 10))
    setComment(existingRecord?.comment ?? "")
    setIsEditing(false)
  }

  return (
  <div>
    {existingRecord && !isEditing ? (
      <div className={styles.recordWrapper}>
        <div className={styles.rateWrapper}>
          <p className={styles.label}>評価</p>
          {[1, 2, 3, 4, 5].map((rate: number) => (
            <span 
              key={rate} 
              className={clsx((rate === rating) && styles.active)} 
            >★</span>
          ))}
        </div>
        <div className={styles.watchedDateWrapper}>
          <p className={styles.label}>鑑賞日</p>
          <p className={styles.watchedDate}>{watchedDate}</p>
        </div>
        <div className={styles.commentWrapper}>
          <p className={styles.label}>コメント</p>
          <p className={styles.comment}>{comment}</p>
        </div>
        <button className={styles.editButton} onClick={()=>{setIsEditing(true)}}>編集</button>
      </div>
    ) : (
      <div className={styles.formWrapper}>
        <div className={styles.rateWrapper}>
          <p className={styles.label}>評価</p>
          {[1, 2, 3, 4, 5].map((rate: number) => (
            <button 
              key={rate} 
              className={clsx((rate <= rating) && styles.active)} 
              onClick={()=>{setRating(rate)}}
            >★</button>
          ))}
        </div>
        <div className={styles.watchedDateWrapper}>
          <p className={styles.label}>鑑賞日</p>
          <input type="date" className={styles.watchedDate} value={watchedDate} onChange={(e) => setWatchedDate(e.target.value)} />
        </div>
        <div className={styles.commentWrapper}>
          <p className={styles.label}>コメント</p>
          <textarea className={styles.comment} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </div>
        <button className={styles.editButton} onClick={()=>{handleCancel()}}>キャンセル</button>
        <button className={styles.editButton} onClick={()=>{handleSaveRecords()}}>登録</button>
      </div>
    )}
  </div>
  )
}

export default RecordTab