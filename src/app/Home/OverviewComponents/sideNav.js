import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function SideNav() {

    return (
        <div className={styles.sideNav}>
            <Link
                className={styles.sideNavLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/noun-home-1560549.png"
                    alt="home"
                    width={20}
                    height={20}
                    priority
                />
                <span>Overview</span>
            </Link>

            <Link
                className={styles.sideNavLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/noun-bell-notification-6655802.png"
                    alt="home"
                    width={20}
                    height={20}
                    priority
                />
                <span>Notifications</span>
            </Link>

            <Link
                className={styles.sideNavLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/document.png"
                    alt="home"
                    width={18}
                    height={18}
                    priority
                />
                <span>Reports</span>
            </Link>

            <Link
                className={styles.sideNavLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/document.png"
                    alt="home"
                    width={18}
                    height={18}
                    priority
                />
                <span>Chat</span>
            </Link>

            <Link
                className={styles.sideNavLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/noun-settings-6701159.png"
                    alt="home"
                    width={20}
                    height={20}
                    priority
                />
                <span>Settings</span>
            </Link>

            <Link
                className={styles.sideNavLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/noun-help-863488.png"
                    alt="home"
                    width={20}
                    height={20}
                    priority
                />
                <span>Help</span>
            </Link>
        </div>
    )
}