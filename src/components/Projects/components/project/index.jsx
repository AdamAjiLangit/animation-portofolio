'use client';
import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';

export default function index({ index, title, manageModal, url, date }) {
    return (
        <div onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }} className={styles.project}>
            <div>
                <h2>{title}</h2>
                <p>Design & Development</p>
            </div>
            <div className={styles.date}>
                <p>{date}</p>
            </div>
        </div>
    )
}
